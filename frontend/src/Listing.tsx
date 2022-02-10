import React from "react";

import {
    SimpleGrid,
    Box,
    HStack,
    Image,
    Text,
    Spacer
} from "@chakra-ui/react"

import {
    StarIcon, ViewIcon
} from "@chakra-ui/icons"

import { ListingType } from "./GlobalExports";

export default function ListingView(props : {listing: ListingType[] | undefined}) {
    return (
        <SimpleGrid minChildWidth='400px' spacing='10px' marginTop='40px'>
            {props.listing && props.listing.map((item, index) => (
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
    )
}
