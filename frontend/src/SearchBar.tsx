
import React, {useState} from 'react'
import {
    FormControl,
    Box,
    Text,
    Button,
    HStack,
    Input,
    Spacer,
    Image,
    useToast,
    SimpleGrid,
} from "@chakra-ui/react"

import {
    StarIcon, ViewIcon
} from "@chakra-ui/icons"

const API_ENDPOINT = "http://localhost:8000/related_repositories/"


type ListingType = {
    name: string,
    description: string,
    owner: string,
    owner_avatar_url: string,
    url: string,
    stargazers_count: number,
    watchers_count: number,
};



function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("")
    const [listingData, setListingData] = useState<ListingType[]>();

    const toast = useToast()

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

                    toast({
                        title: `Fetching data from API`,
                        status: "info",
                        isClosable: true,
                    })

                    setListingData(undefined)

                    fetch(API_ENDPOINT + searchTerm, {
                        method: "GET"
                    }).then(
                        response => response.json()
                    ).then(
                        data => setListingData(data["repositories"])
                    ).finally(
                        () => {
                            toast({
                                title: `Done`,
                                status: "success",
                                isClosable: true,
                            })
                        }
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


            <SimpleGrid minChildWidth='400px' spacing='20px'>
                {listingData && listingData.map((item, index) => (
                    <Box key={index} marginTop={2} borderWidth='1px' borderRadius='lg'>
                        <HStack padding="8px">
                            <Image
                                src={item.owner_avatar_url}
                                alt={item.owner}
                                boxSize='40px'
                                borderRadius='full'/>

                            <Text align="start" fontSize='md'>
                                <a href={item.url}><b>{item.name}</b></a>
                            </Text>

                            <Spacer />

                            <HStack>
                                <StarIcon />
                                <Text>{item.stargazers_count}</Text>
                            </HStack>

                            <HStack>
                                <ViewIcon />
                                <Text>{item.watchers_count}</Text>
                            </HStack>

                        </HStack>

                        <Box padding="8px">
                            <Text>{item.description}</Text>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>


        </div>
    )
}

export default SearchBar
