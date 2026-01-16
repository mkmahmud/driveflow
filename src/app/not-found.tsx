"use client"

import { Center, Heading, Text, Button, VStack, Box } from "@chakra-ui/react"
import NextLink from "next/link"
import { Home, Map } from "lucide-react"

export default function NotFound() {
    return (
        <Center h="80vh" w="full" px="4">
            <VStack gap="8" textAlign="center">
                {/* Visual Element */}
                <Box color="gray.200">
                    <Map size={120} />
                </Box>

                <VStack gap="3">
                    <Heading fontSize={{ base: "6xl", md: "8xl" }} fontWeight="black" color="primary">
                        404
                    </Heading>
                    <Heading size="xl">You've taken a wrong turn!</Heading>
                    <Text color="gray.500" maxW="md">
                        The page you are looking for doesn't exist or has been moved to a different parking spot.
                    </Text>
                </VStack>

                <Button
                    asChild
                    colorPalette="teal"
                    size="xl"
                    px="10"
                    rounded="full"
                    shadow="lg"
                >
                    <NextLink href="/">
                        <Home style={{ marginRight: '8px' }} size={20} />
                        Back to Home
                    </NextLink>
                </Button>
            </VStack>
        </Center>
    )
}