"use client"

import {
    Box, Container, Flex, Heading, Stack, Text,
    SimpleGrid, Circle, Badge, Span, Icon, Grid, GridItem,
    HStack
} from "@chakra-ui/react"
import { Search, Key, ShieldCheck, CreditCard, ChevronRight, CarFront } from "lucide-react"

const STEPS = [
    {
        id: "01",
        title: "Find & Reserve",
        desc: "Browse our curated fleet. Filter by brand, type, or price. Once you find the perfect car, book it instantly with our secure payment system.",
        icon: Search
    },
    {
        id: "02",
        title: "Digital Verification",
        desc: "No paperwork. Complete your identity check and document upload directly via the app. Our AI verifies your license in seconds.",
        icon: ShieldCheck
    },
    {
        id: "03",
        title: "Unlock & Drive",
        desc: "On the day of your trip, use the digital key in the app to unlock the vehicle. Inspect, start the engine, and hit the road.",
        icon: Key
    },
    {
        id: "04",
        title: "Seamless Return",
        desc: "Return the car to the designated spot, upload a few photos for the final check, and lock it via the app. Your deposit is released instantly.",
        icon: CreditCard
    }
]

export default function HowItWorksPage() {
    return (
        <Box bg="white" minH="100vh" color="gray.900">

            {/* 1. HERO: Big Typographic Intro */}
            <Box pt="32" pb="20" borderBottom="1px solid" borderColor="gray.100">
                <Container maxW="7xl">
                    <Stack gap="6" maxW="4xl">
                        <Badge variant="subtle" colorPalette="teal" alignSelf="flex-start" rounded="full" px="4">
                            THE PROCESS
                        </Badge>
                        <Heading fontSize={{ base: "5xl", md: "8xl" }} fontWeight="900" letterSpacing="-0.05em" lineHeight="0.9">
                            Rental <Span color="gray.300">Simplified.</Span>
                        </Heading>
                        <Text fontSize="xl" color="gray.500" fontWeight="medium">
                            We’ve removed the queues and the paperwork. Experience a completely
                            digital car-sharing journey designed for the modern era.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* 2. THE JOURNEY: Vertical Border-Grid */}
            <Container maxW="7xl" py="0">
                <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}>

                    {/* Left Side: Sticky Illustration/Label */}
                    <GridItem colSpan={{ base: 1, lg: 4 }} pt="20" pb="10" borderRight={{ lg: "1px solid" }} borderColor="gray.100">
                        <Stack gap="4" position="sticky" top="40">
                            <Text fontWeight="900" fontSize="xs" letterSpacing="0.3em" color="teal.600">
                                GUEST JOURNEY
                            </Text>
                            <Heading size="2xl" fontWeight="900">Four steps <br /> to the road.</Heading>
                            <Box mt="8">
                                <CarFront size={120} strokeWidth={0.5} className="text-gray-100" />
                            </Box>
                        </Stack>
                    </GridItem>

                    {/* Right Side: The Steps */}
                    <GridItem colSpan={{ base: 1, lg: 8 }} pl={{ lg: "20" }}>
                        <Stack gap="0">
                            {STEPS.map((step, idx) => (
                                <Flex
                                    key={step.id}
                                    py="20"
                                    gap="10"
                                    direction={{ base: "column", md: "row" }}
                                    borderBottom={idx !== STEPS.length - 1 ? "1px solid" : "none"}
                                    borderColor="gray.50"

                                >
                                    <Text fontSize="5xl" fontWeight="900" color="gray.100" lineHeight="0.8" transition="all 0.3s" _groupHover={{ color: "teal.600" }}>
                                        {step.id}
                                    </Text>
                                    <Stack gap="4" flex="1">
                                        <HStack gap="4">
                                            <Circle size="10" bg="gray.50" color="teal.600">
                                                <step.icon size={20} />
                                            </Circle>
                                            <Heading size="xl" fontWeight="900" letterSpacing="-0.02em">
                                                {step.title}
                                            </Heading>
                                        </HStack>
                                        <Text fontSize="lg" color="gray.600" lineHeight="tall" maxW="xl">
                                            {step.desc}
                                        </Text>
                                    </Stack>
                                </Flex>
                            ))}
                        </Stack>
                    </GridItem>
                </Grid>
            </Container>

            {/* 3. CALL TO ACTION: Contrast Section */}
            <Box py="24" bg="gray.900" color="white" roundedTop="5xl">
                <Container maxW="5xl" textAlign="center">
                    <Stack gap="10" align="center">
                        <Heading size="3xl" fontWeight="900" letterSpacing="-0.03em">
                            Ready to take the wheel?
                        </Heading>
                        <Text fontSize="xl" opacity="0.7" maxW="2xl">
                            Join thousands of users who have ditched traditional rental counters for our 100% digital experience.
                        </Text>
                        <Flex
                            as="button"
                            bg="teal.600"
                            color="white"
                            px="10" h="16"
                            rounded="2xl"
                            fontWeight="900"
                            align="center"
                            gap="3"
                            _hover={{ bg: "teal.500", transform: "scale(1.02)" }}
                            transition="all 0.2s"
                        >
                            Start Browsing <ChevronRight size={20} />
                        </Flex>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}