'use client'

import { Button, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGlobe, FaMobileScreenButton } from "react-icons/fa6";

export default function RootPage() {
    return (
        <Grid gap={8} px={4}>
            <Grid 
                textAlign='center'
                borderTopColor='gray.700' 
                borderTopStyle='dotted'
                borderTopWidth='3px'
                pt={6}
            >
                <Text fontSize='x-large'>Quick Solves & Epic Duels:</Text>
                <Text fontSize='x-large'>Welcome to Math Battle!</Text>
            </Grid>
            <Grid
                borderTopColor='gray.700' 
                borderTopStyle='dotted'
                borderTopWidth='3px'
                pt={4}
                gap={4}
            >
                <Heading fontSize='xl'>Play on the same device</Heading>
                <Text>Pass this device back and forth to answer math questions the fastest.</Text>
                <Button
                    as={NextLink}
                    href='/local'
                    colorScheme="cyan"
                    width='full'
                    size='lg'
                    leftIcon={<Icon as={FaMobileScreenButton} />}
                >
                    Start Pass & Play Battle
                </Button>
            </Grid>
            {/* <Grid
                borderTopColor='gray.700' 
                borderTopStyle='dotted'
                borderTopWidth='3px'
                pt={4}
                pb={6}
                gap={4}
            >
                <Heading fontSize='xl'>
                    Play with friends online
                </Heading>
                <Text>Create a new online game, and give your friends the code or link to join your math battle.</Text>
                <Button
                    as={NextLink}
                    href='/battle'
                    colorScheme="cyan"
                    width='full'
                    size='lg'
                    leftIcon={<Icon as={FaGlobe} />}
                >
                    Start Online Battle
                </Button>
            </Grid> */}
        </Grid>
    )
}