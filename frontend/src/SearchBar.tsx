
import React, {useState} from 'react'
import {
    FormControl,
    Box,
    Text,
    Button,
    HStack,
    Input,
    useToast,
} from "@chakra-ui/react"

import {
    API_ENDPOINT,
    ListingPropSetter
} from './GlobalExports'


function SearchBar(props: ListingPropSetter) {
    const [searchTerm, setSearchTerm] = useState("")

    const toast = useToast()

    return (
        <div>
            <Box marginTop={4} marginBottom={2}>
                <Text>
                    Enter GitHub Organization Name
                </Text>
            </Box>

            <form onSubmit={async (e) => {
                    e.preventDefault()

                    toast({
                        title: `Fetching data from API`,
                        status: "info",
                        isClosable: true,
                    })

                    props.listingDataSetter([])

                    console.info(`Searching for ${searchTerm}`)
                    const response = await fetch(
                        `${API_ENDPOINT}${searchTerm}`,
                        {method: "GET"}
                    )
                    const body = await response.json();

                    props.listingDataSetter(body["repositories"])

                    toast({
                        title: `Done`,
                        status: "success",
                        isClosable: true,
                    })

                    console.info("Done.")
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
        </div>
    )
}

export default SearchBar
