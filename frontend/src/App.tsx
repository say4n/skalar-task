import React, { useState } from "react"
import {
    ChakraProvider,
    Grid,
    theme,
    HStack,
    Heading,
    Spacer
} from "@chakra-ui/react"
import {
    ListingType
} from "./GlobalExports";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import SearchBar from "./SearchBar"
import ListingView from "./Listing"

export default function App(){
    const [listingData, setListingData] = useState<ListingType[]>();

    return (
        <ChakraProvider theme={theme}>
            <Grid p={4}>
                <HStack>
                    <Heading justifySelf="flex-begin">Skalar Take Home Task</Heading>
                    <Spacer />
                    <ColorModeSwitcher justifySelf="end" />
                </HStack>

                <SearchBar listingDataSetter={setListingData}/>

                <ListingView listing={listingData}/>

            </Grid>
        </ChakraProvider>
    )
}
