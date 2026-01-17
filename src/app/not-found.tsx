"use client"

import { Center, Heading, Text, Button, VStack, Box, HStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { Home, Car, MapPin, ArrowRight } from "lucide-react"

export default function NotFound() {
    return (
        <Center minH="80vh" w="full" px="4" bg="gray.50">
            <VStack gap="10" textAlign="center" maxW="2xl">
                {/* Animated Car Illustration */}
                <Box position="relative" w="160px" h="160px">
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="120px"
                        h="120px"
                        bg="rgba(13, 148, 136, 0.1)"
                        rounded="full"
                        animation="pulse 2s infinite"
                    />
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="80px"
                        h="80px"
                        bg="rgba(13, 148, 136, 0.15)"
                        rounded="full"
                        animation="pulse 2s infinite 0.5s"
                    />
                    <Center
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="60px"
                        h="60px"
                        bg="#0D9488"
                        rounded="xl"
                        boxShadow="0 8px 24px rgba(13, 148, 136, 0.3)"
                    >
                        <Car size={32} color="white" />
                    </Center>
                </Box>

                <VStack gap="4">
                    <Box
                        bg="rgba(13, 148, 136, 0.1)"
                        border="1px solid"
                        borderColor="rgba(13, 148, 136, 0.2)"
                        px="4"
                        py="1"
                        rounded="full"
                        display="inline-flex"
                        alignItems="center"
                        gap="2"
                    >
                        <MapPin size={14} color="#0D9488" />
                        <Text
                            color="#0D9488"
                            fontWeight="semibold"
                            fontSize="sm"
                            letterSpacing="wide"
                        >
                            PAGE NOT FOUND
                        </Text>
                    </Box>

                    <Heading
                        fontSize={{ base: "7xl", md: "8xl" }}
                        fontWeight="black"
                        bgGradient="linear(to-r, #0D9488, #38BDF8)"
                        bgClip="text"
                        lineHeight="1"
                    >
                        404
                    </Heading>
                    
                    <Heading
                        size="2xl"
                        color="#1E293B"
                        fontWeight="bold"
                        lineHeight="1.2"
                    >
                        Lost on the Road?
                    </Heading>
                    
                    <Text 
                        color="#64748B" 
                        fontSize={{ base: "lg", md: "xl" }}
                        lineHeight="1.7"
                        maxW="lg"
                    >
                        The page you're looking for has taken a detour. 
                        Don't worry, we'll help you get back on track to find your perfect ride.
                    </Text>
                </VStack>

                <HStack gap="4" flexWrap="wrap" justify="center">
                    <Button
                        asChild
                        bg="#0D9488"
                        color="white"
                        size="lg"
                        px="8"
                        rounded="xl"
                        fontWeight="semibold"
                        _hover={{
                            bg: "#0c857a",
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 25px rgba(13, 148, 136, 0.3)"
                        }}
                        _active={{ transform: "translateY(0)" }}
                        transition="all 0.3s ease"
                        // @ts-ignore
                        leftElement={<Home size={20} />}
                    >
                        <NextLink href="/">
                            Back to Home
                        </NextLink>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        px="8"
                        rounded="xl"
                        fontWeight="semibold"
                        borderColor="#E2E8F0"
                        color="#64748B"
                        _hover={{
                            bg: "white",
                            borderColor: "#0D9488",
                            color: "#0D9488",
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                        }}
                        _active={{ transform: "translateY(0)" }}
                        transition="all 0.3s ease"
                        // @ts-ignore
                        rightElement={<ArrowRight size={20} />}
                    >
                        <NextLink href="/browse">
                            Browse Cars
                        </NextLink>
                    </Button>
                </HStack>

                {/* Stats for Trust */}
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="2xl"
                    p="6"
                    mt="4"
                    maxW="md"
                >
                    <HStack justify="center" gap="8" flexWrap="wrap">
                        <VStack gap="1">
                            <Text
                                fontWeight="bold"
                                fontSize="2xl"
                                color="#0D9488"
                            >
                                5000+
                            </Text>
                            <Text fontSize="sm" color="#64748B">
                                Happy Customers
                            </Text>
                        </VStack>
                        <Box w="1px" h="8" bg="gray.200" />
                        <VStack gap="1">
                            <Text
                                fontWeight="bold"
                                fontSize="2xl"
                                color="#0D9488"
                            >
                                250+
                            </Text>
                            <Text fontSize="sm" color="#64748B">
                                Cars Available
                            </Text>
                        </VStack>
                        <Box w="1px" h="8" bg="gray.200" />
                        <VStack gap="1">
                            <Text
                                fontWeight="bold"
                                fontSize="2xl"
                                color="#0D9488"
                            >
                                24/7
                            </Text>
                            <Text fontSize="sm" color="#64748B">
                                Support
                            </Text>
                        </VStack>
                    </HStack>
                </Box>
            </VStack>

            {/* Add custom animations */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }
            `}</style>
        </Center>
    )
}