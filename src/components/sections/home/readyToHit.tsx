"use client"

import { Box, Container, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react"

export default function ReadyToHit() {
    return (
        <Box
            bg="teal.500"
            py={{ base: "16", md: "24" }}
            my="10"
            rounded={{ base: "none", md: "3xl" }}
            mx={{ base: "0", md: "4" }}
        >
            <Container maxW="breakpoint-md">
                <Stack gap="8" align="center" textAlign="center">

                    {/* Section Titles */}
                    <Stack gap="4">
                        <Heading
                            color="white"
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="extrabold"
                            lineHeight="1.2"
                        >
                            Ready to hit the road?
                        </Heading>
                        <Text
                            color="white/80"
                            fontSize={{ base: "lg", md: "xl" }}
                            maxW="xl"
                        >
                            Join thousands of satisfied drivers today. Book your perfect car in seconds and start your journey with DriveFlow.
                        </Text>
                    </Stack>

                    {/* Two Buttons */}
                    <Flex direction={{ base: "column", sm: "row" }} gap="4" w={{ base: "full", sm: "auto" }}>
                        <Button
                            bg="white"
                            color="teal.500"
                            size="xl"
                            px="10"
                            rounded="full"
                            fontWeight="bold"
                            _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
                            transition="all 0.2s"
                        >
                            Book a Car Now
                        </Button>
                        <Button
                            variant="outline"
                            color="white"
                            borderColor="white/40"
                            size="xl"
                            px="10"
                            rounded="full"
                            fontWeight="bold"
                            _hover={{ bg: "white/10", borderColor: "white" }}
                        >
                            Contact Support
                        </Button>
                    </Flex>

                </Stack>
            </Container>
        </Box>
    )
}