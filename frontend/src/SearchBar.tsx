
import React, {useState} from 'react'
import {
    FormControl,
    Box,
    Text,
    Button,
    HStack,
    Input,
    Circle,
    Image,
    useToast,
    VStack
} from "@chakra-ui/react"

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


            {listingData && listingData.map((item, index) => (
                <Box key={index} marginTop={2} borderWidth='1px' borderRadius='lg'>
                    <HStack>
                        <Circle size='40px' color='white' flex="1">
                            <Image src={item.owner_avatar_url} alt={item.owner} />
                        </Circle>

                        <VStack>
                            <Text flex="1">{item.name}</Text>
                            <Text flex="1">{item.description}</Text>
                        </VStack>
                    </HStack>
                </Box>
            ))}


        </div>
    )
}

export default SearchBar
