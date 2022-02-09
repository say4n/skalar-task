import * as React from "react"
import {
    ChakraProvider,
    Grid,
    theme,
    HStack,
    Heading,
    Spacer,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import SearchBar from "./SearchBar"

export const App = () => (
    <ChakraProvider theme={theme}>
        <Grid p={4}>
            <HStack>
                <Heading justifySelf="flex-begin">Skalar Take Home Task</Heading>
                <Spacer />
                <ColorModeSwitcher justifySelf="end" />
            </HStack>

            <SearchBar />

        </Grid>
    </ChakraProvider>
)
