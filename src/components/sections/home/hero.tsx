"use client"

import { Box, Text, Heading, Button, Stack, Input, Center, Flex } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { MapPin, Calendar } from "lucide-react"

export default function Hero() {
    return (
        <Box position="relative" h="80vh" w="full" bg="black" overflow="hidden" rounded="50px">
            {/* LAYER 1: Background Image */}
            <Box
                position="absolute"
                inset="0"
                zIndex="0"
                bgImage="url('/bg.jpeg')" // Make sure this file is in your /public folder
                bgSize="cover"
                bgRepeat="no-repeat"
            />

            {/* LAYER 2: Pure Black Overlay (Adjust opacity here) */}
            <Box
                position="absolute"
                inset="0"
                bg="black"
                opacity="0.6" // 0.6 is a good balance for readability
                zIndex="1"
            />

            {/* LAYER 3: Centered Content */}
            <Center h="full" w="full" position="relative" zIndex="2"  >
                <Stack gap="8" align="center" textAlign="center" w="full" maxW="4xl">

                    {/* Top Subheading */}
                    <Text
                        color="teal.400"
                        fontWeight="bold"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        fontSize="xs"
                    >
                        Fast & Easy Way to Rent a Car
                    </Text>

                    {/* Large Main Heading */}
                    <Heading
                        color="white"
                        fontSize={{ base: "4xl", md: "7xl" }}
                        fontWeight="extrabold"
                        lineHeight="1.1"
                    >
                        Your Journey, <br /> Your Choice
                    </Heading>

                    {/* Bottom Subheading */}
                    <Text color="white/80" fontSize={{ base: "md", md: "xl" }} maxW="2xl">
                        Experience the ultimate driving pleasure with our premium fleet.
                        Rent the car of your dreams today.
                    </Text>

                    {/* SEARCH BOX (Location, Date, Button) */}
                    <Box
                        bg="white"
                        p="2"
                        rounded="2xl"
                        shadow="dark-lg"
                        w="full"
                        maxW="850px"
                        mt="6"
                    >
                        <Flex direction={{ base: "column", md: "row" }} gap="2" p="2">

                            {/* Item 1: Location */}
                            <InputGroup flex="1.5" startElement={<MapPin size={20} color="gray" />}>
                                <Input
                                    placeholder="Pickup Location"

                                    h="14"
                                    outline="none"
                                    border="none"
                                    _focus={{ ring: 0 }}
                                />
                            </InputGroup>

                            {/* Divider for Desktop */}
                            <Box w="1px" bg="gray.200" display={{ base: "none", md: "block" }} my="3" />

                            {/* Item 2: Date */}
                            <InputGroup flex="1" startElement={<Calendar size={20} color="gray" />}>
                                <Input
                                    placeholder="Date"
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    outline="none"
                                    h="14"
                                    border="none"
                                    _focus={{ ring: 0 }}
                                />
                            </InputGroup>

                            {/* Item 3: Search Button */}
                            <Button
                                colorPalette="teal"
                                h="14"
                                px="12"
                                rounded="xl"
                                fontSize="lg"
                                fontWeight="bold"
                                w={{ base: "full", md: "auto" }}
                            >
                                Search
                            </Button>
                        </Flex>
                    </Box>

                </Stack>
            </Center>
        </Box>
    )
}