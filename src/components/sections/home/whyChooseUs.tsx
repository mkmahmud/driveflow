"use client"

import { Box, Container, Heading, Text, Flex, SimpleGrid, Stack, Icon, Center } from "@chakra-ui/react"
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react"

const FEATURES = [
    {
        title: "Secure Payments",
        desc: "Your transactions are protected with industry-leading encryption and security protocols.",
        icon: ShieldCheck,
    },
    {
        title: "Fast Booking",
        desc: "Reserve your dream car in less than 60 seconds with our streamlined checkout process.",
        icon: Zap,
    },
    {
        title: "24/7 Support",
        desc: "Our dedicated team is always available to help you with any queries during your journey.",
        icon: HeartHandshake,
    }
]

export default function WhyChooseUs() {
    return (
        <Container    >
            {/* HEADER: Title Left / Driver Badge Right */}
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "flex-end" }}
                mb="12"
                gap="6"
            >
                <Stack gap="3">
                    <Text color="teal.500" fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                        Our Features
                    </Text>
                    <Heading size="4xl" fontWeight="extrabold" maxW="lg" lineHeight="1.2">
                        Why Choose DriveFlow?
                    </Heading>
                </Stack>

                {/* Driver Badge */}
                <Box
                    bg="teal.500/20" 
                    px="6"
                    py="3"
                    rounded="full"
                    fontWeight="bold"
                    shadow="lg"
                    fontSize="sm"
                >
                    Join 50+ Happy Drivers
                </Box>
            </Flex>

            {/* 3 CARDS */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
                {FEATURES.map((feature, index) => (
                    <Stack
                        key={index}
                        p="10"
                        bg="gray.50"
                        rounded="3xl"
                        gap="6"
                        transition="all 0.3s"
                        _hover={{ bg: "white", shadow: "2xl", transform: "translateY(-10px)" }}
                        border="1px solid"
                        borderColor="transparent" 
                    >
                        <Center w="16" h="16" bg="white" rounded="2xl" shadow="md" color="teal.600">
                            <feature.icon size={32} />
                        </Center>
                        <Stack gap="3">
                            <Heading size="xl" fontWeight="bold">
                                {feature.title}
                            </Heading>
                            <Text color="gray.600" lineHeight="tall">
                                {feature.desc}
                            </Text>
                        </Stack>
                    </Stack>
                ))}
            </SimpleGrid>
        </Container>
    )
}