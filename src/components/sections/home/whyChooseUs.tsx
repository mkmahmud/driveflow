"use client"

import { Box, Container, Heading, Text, Flex, SimpleGrid, Stack, Center, HStack } from "@chakra-ui/react"
import { ShieldCheck, Zap, HeartHandshake, Users, Car, Clock } from "lucide-react"

const FEATURES = [
    {
        title: "Secure Payments",
        desc: "Your transactions are protected with industry-leading encryption and security protocols.",
        icon: ShieldCheck,
        gradient: "linear(135deg, #0D9488 0%, #38BDF8 100%)"
    },
    {
        title: "Fast Booking",
        desc: "Reserve your dream car in less than 60 seconds with our streamlined checkout process.",
        icon: Zap,
        gradient: "linear(135deg, #38BDF8 0%, #0D9488 100%)"
    },
    {
        title: "24/7 Support",
        desc: "Our dedicated team is always available to help you with any queries during your journey.",
        icon: HeartHandshake,
        gradient: "linear(135deg, #0D9488 0%, #1E293B 100%)"
    }
]

const STATS = [
    { label: "Happy Customers", value: "5000+", icon: Users },
    { label: "Cars Available", value: "250+", icon: Car },
    { label: "Cities", value: "50+", icon: HeartHandshake },
    { label: "Support Hours", value: "24/7", icon: Clock }
]

export default function WhyChooseUs() {
    return (
        <Box bg="white" py="20" w="full">
            <Container maxW="7xl" px={{ base: "4", md: "8", lg: "12" }}>
                {/* HEADER */}
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", md: "flex-end" }}
                    mb="16"
                    gap={{ base: "8", md: "0" }}
                >
                    <Stack gap="3" maxW="2xl">
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
                            w="fit-content"
                        >
                            <Text
                                color="#0D9488"
                                fontWeight="semibold"
                                fontSize="sm"
                                letterSpacing="wide"
                            >
                                OUR FEATURES
                            </Text>
                        </Box>

                        <Stack gap="1">
                            <Heading
                                color="#1E293B"
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                fontWeight="bold"
                                lineHeight="1.1"
                            >
                                Why Choose
                                <Box
                                    as="span"
                                    color="#0D9488"
                                    ml="2"
                                >
                                    DriveFlow?
                                </Box>
                            </Heading>
                            <Text
                                color="#64748B"
                                fontSize={{ base: "lg", md: "xl" }}
                                lineHeight="1.7"
                            >
                                Experience the difference with our premium car rental service designed for your comfort and convenience.
                            </Text>
                        </Stack>
                    </Stack>

                    {/* Stats Badge */}
                    <Box
                        bg="#0D9488"
                        color="white"
                        px="6"
                        py="4"
                        rounded="2xl"
                        fontWeight="semibold"
                        shadow="0 10px 30px rgba(13, 148, 136, 0.2)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        backdropFilter="blur(10px)"
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            inset: '0',
                            bg: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            zIndex: '1'
                        }}
                    >
                        <Text fontSize="sm" mb="1" opacity="0.9">Trusted by</Text>
                        <Text fontSize="xl" fontWeight="bold">50,000+</Text>
                        <Text fontSize="sm" opacity="0.9">Happy Customers</Text>
                    </Box>
                </Flex>

                {/* STATS GRID */}
                <SimpleGrid
                    columns={{ base: 2, md: 4 }}
                    gap={{ base: "6", md: "8" }}
                    mb="16"
                >
                    {STATS.map((stat, index) => (
                        <Box
                            key={index}
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            p="6"
                            rounded="2xl"
                            shadow="sm"
                            transition="all 0.3s ease"
                          
                        >
                            <HStack gap="4">
                                <Center
                                    w="12"
                                    h="12"
                                    bg="rgba(13, 148, 136, 0.1)"
                                    rounded="xl"
                                >
                                    <stat.icon size={20} color="#0D9488" />
                                </Center>
                                <Box>
                                    <Text
                                        fontWeight="bold"
                                        fontSize="2xl"
                                        color="#1E293B"
                                        lineHeight="1"
                                    >
                                        {stat.value}
                                    </Text>
                                    <Text
                                        fontSize="sm"
                                        color="#64748B"
                                        mt="1"
                                    >
                                        {stat.label}
                                    </Text>
                                </Box>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>

                {/* FEATURES GRID */}
                <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    gap={{ base: "8", md: "10" }}
                >
                    {FEATURES.map((feature, index) => (
                        <Box
                            key={index}
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            p="8"
                            rounded="3xl"
                            shadow="sm"
                            transition="all 0.4s ease"
                            position="relative"
                            overflow="hidden"
                            
                            _before={{
                                content: '""',
                                position: 'absolute',
                                inset: '0',
                                bg: feature.gradient,
                                opacity: '0',
                                transition: 'opacity 0.4s ease',
                                zIndex: '0'
                            }}
                            // @ts-ignore
                            sx={{
                                '&:hover': {
                                    '&:before': {
                                        opacity: '0.03'
                                    },
                                    '& > *': {
                                        position: 'relative',
                                        zIndex: '1'
                                    }
                                }
                            }}
                        >
                            {/* Icon */}
                            <Center
                                w="16"
                                h="16"
                                bgGradient={feature.gradient}
                                rounded="2xl"
                                mb="6"
                                shadow="0 8px 24px rgba(13, 148, 136, 0.2)"
                            >
                                <feature.icon size={28} color="white" />
                            </Center>

                            {/* Content */}
                            <Stack gap="4">
                                <Heading
                                    size="xl"
                                    fontWeight="bold"
                                    color="#1E293B"
                                >
                                    {feature.title}
                                </Heading>
                                <Text
                                    color="#64748B"
                                    lineHeight="1.7"
                                    fontSize="lg"
                                >
                                    {feature.desc}
                                </Text>
                            </Stack>

                            {/* Decorative Number */}
                            <Text
                                position="absolute"
                                top="6"
                                right="6"
                                fontSize="6xl"
                                fontWeight="black"
                                color="rgba(13, 148, 136, 0.05)"
                                lineHeight="1"
                                userSelect="none"
                            >
                                {index + 1}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

                {/* CTA Section */}
                <Box
                    mt="20"
                    p="8"
                    bg="#0D9488"
                    rounded="3xl"
                    position="relative"
                    overflow="hidden"
                    _before={{
                        content: '""',
                        position: 'absolute',
                        inset: '0',
                        bg: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                        zIndex: '1'
                    }}
                >
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align="center"
                        justify="space-between"
                        gap={{ base: "6", md: "0" }}
                        position="relative"
                        zIndex="2"
                    >
                        <Stack gap="2" maxW="2xl">
                            <Heading
                                size="2xl"
                                fontWeight="bold"
                                color="white"
                            >
                                Ready to drive your dream car?
                            </Heading>
                            <Text
                                color="rgba(255, 255, 255, 0.9)"
                                fontSize="lg"
                            >
                                Join thousands of satisfied customers and experience premium car rental today.
                            </Text>
                        </Stack>
                        <Box
                            as="button"
                            bg="white"
                            color="#0D9488"
                            px="8"
                            py="4"
                            rounded="xl"
                            fontSize="lg"
                            fontWeight="semibold"
                            _hover={{
                                bg: "rgba(255, 255, 255, 0.9)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 12px 30px rgba(255, 255, 255, 0.2)"
                            }}
                            transition="all 0.3s ease"
                        >
                            Get Started Now
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}