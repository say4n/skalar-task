import { Dispatch, SetStateAction } from "react";

export const API_ENDPOINT = "http://localhost:8000/related_repositories/"

export interface ListingType {
    name: string,
    description: string,
    owner: string,
    owner_avatar_url: string,
    url: string,
    stargazers_count: number,
    watchers_count: number,
};

export interface ListingPropSetter {
    listingDataSetter: Dispatch<SetStateAction<ListingType[] | undefined>>
}