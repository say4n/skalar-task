
import React, {useState} from 'react'
import {
    FormControl,
    Box,
    Text,
    Button,
    HStack,
    Input,
} from "@chakra-ui/react"

const API_ENDPOINT = "http://localhost:8000/related_repositories/"


type Listing = {
    full_name: string
};

type ListingType = Listing[];


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("")
    const [listingData, setListingData] = useState<ListingType>();

    return (
        <div>
            <Box marginTop={4} marginBottom={2}>
                <Text>
                    Enter GitHub Organization Name
                </Text>
            </Box>

            <form onSubmit={(e) => {
                    e.preventDefault()
                    console.info(`Searching for ${searchTerm}`)

                    fetch(API_ENDPOINT + searchTerm, {
                        method: "GET"
                    }).then(
                        response => response.json()
                    ).then(
                        data => setListingData(data["repositories"])
                    )
                }}>
                <HStack>
                    <FormControl isRequired flex="5">
                        <Input id='organization' placeholder='Skalar' onChange={
                            (e) => {
                                setSearchTerm(e.target.value)
                            }
                        } />
                    </FormControl>

                    <Button colorScheme='teal' variant='solid' type="submit" flex="1">
                        Submit
                    </Button>
                </HStack>
            </form>

            <ul>
                {listingData && listingData.map((item, index) => (
                    <li key={index}>
                        {item.full_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchBar
