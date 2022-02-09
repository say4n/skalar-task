'use strict'

const express = require('express')
const { Octokit } = require("@octokit/core");
const flatCache = require('flat-cache')
const path = require('path');

const cache = flatCache.load('backend-cache', path.resolve("./.cache"));

const octokit = new Octokit({ auth: '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' })
octokit.hook.after("request", async (response, options) => {
    console.info("Executed", options.method, options.url, response.status);
});

const app = express()
const port = process.env.PORT || 8000

function repoProcessor(repo) {
    return {
        name: repo.name,
        description: repo.description,
        owner: repo.owner.name,
        owner_avatar_url: repo.owner.avatar_url,
        url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers,
    }
}

app.get('/related_repositories/:organization', async (req, res) => {
    const { organization } = req.params
    var response

    if (response = cache.getKey(organization.toLowerCase())) {
        console.log('Returning cached data for:', organization)
    }
    else {
        console.info(`Fetching org repos for ${organization}.`)
        const all_org_repos = await octokit.request('GET /orgs/{org}/repos', {
            org: organization
        })

        console.info(`Fetching org members for ${organization}.`)
        const org_members = await octokit.request('GET /orgs/{org}/members', {
            org: organization
        })

        var all_member_repos = []
        var all_watched_repos = []

        for (const member of org_members.data) {
            const member_repos = await octokit.request('GET /users/{username}/repos', {
                username: member.login
            })

            all_member_repos = [...all_member_repos, ...member_repos.data]

            const watched_repos = await octokit.request('GET /users/{username}/subscriptions', {
                username: member.login
            })

            all_watched_repos = [...all_watched_repos, ...watched_repos.data]
        }

        const all_repos = [...all_org_repos.data, ...all_member_repos, ...all_watched_repos]
        const all_unique_repos = [...new Set(all_repos)]

        response = all_unique_repos.map(repoProcessor).sort((repo_a, repo_b) => {
            return repo_b.watchers_count + repo_b.stargazers_count - repo_a.watchers_count - repo_a.stargazers_count
        })

        cache.setKey(organization.toLowerCase(), all_unique_repos)
        cache.save(true)
    }

    res.json({
        "repositories" : response
    })
})

app.listen(port, () => {
    console.log(`backend app listening on port http://localhost:${port}`)
})
