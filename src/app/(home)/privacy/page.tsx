"use client"

import {
    Box, Container, Flex, Heading, Stack, Text,
    Separator, Span, HStack, Link, Circle, Badge
} from "@chakra-ui/react"
import { ShieldCheck, Eye, Database, Lock, ArrowRight } from "lucide-react"

const POLICY_SECTIONS = [
    {
        id: "01",
        title: "Data Collection",
        content: "We collect information essential to providing a secure car-sharing experience. This includes biometric data for identity verification, GPS telemetry for vehicle security, and transaction history for financial transparency."
    },
    {
        id: "02",
        title: "How We Use Data",
        content: "Your data is primarily used to facilitate bookings and ensure safety. We analyze usage patterns to optimize fleet distribution and improve our app's performance. We do not sell your personal information to third-party advertisers."
    },
    {
        id: "03",
        title: "Security Protocols",
        content: "We utilize bank-grade AES-256 encryption for all data at rest. Our infrastructure is hosted on SOC 2 Type II compliant servers, and we conduct regular third-party security audits to ensure your digital identity remains protected."
    },
    {
        id: "04",
        title: "User Rights & Control",
        content: "You have the right to access, export, or delete your data at any time through the 'Privacy Settings' in your dashboard. We retain trip logs only as long as required by local insurance and tax regulations."
    }
]

export default function PrivacyPolicyPage() {
    return (
        <Box bg="white" minH="100vh" color="gray.900">

            {/* 1. Header: Matching the FAQ/Terms Style */}
            <Box pt="32" pb="16" borderBottom="1px solid" borderColor="gray.100">
                <Container maxW="6xl">
                    <Stack gap="6">
                        <Badge variant="subtle" colorPalette="teal" alignSelf="flex-start" rounded="full" px="4">
                            GDPR & CCPA COMPLIANT
                        </Badge>
                        <Heading fontSize={{ base: "5xl", md: "7xl" }} fontWeight="900" letterSpacing="-0.05em">
                            Privacy <Span color="teal.600">Policy.</Span>
                        </Heading>
                        <Text color="gray.500" fontSize="lg" fontWeight="medium">
                            Last Updated: January 27, 2026 — Version 4.2
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* 2. Content Layout */}
            <Container maxW="6xl" py="20">
                <Flex direction={{ base: "column", lg: "row" }} gap="20">

                    {/* Left Sidebar: Quick Navigation */}
                    <Box w={{ base: "full", lg: "280px" }} position={{ lg: "sticky" }} top="40" h="fit-content">
                        <Stack gap="6">
                            <Text fontWeight="900" fontSize="xs" letterSpacing="0.3em" color="gray.400" mb="2">SECTIONS</Text>
                            {POLICY_SECTIONS.map((section) => (
                                <HStack key={section.id}   cursor="pointer">
                                    <Text fontSize="xs" fontWeight="900" color="teal.600">{section.id}</Text>
                                    <Text
                                        fontWeight="800"
                                        fontSize="sm"
                                        _groupHover={{ color: "teal.600" }}
                                        transition="color 0.2s"
                                    >
                                        {section.title.toUpperCase()}
                                    </Text>
                                </HStack>
                            ))}
                        </Stack>
                    </Box>

                    {/* Right Column: Detailed Text */}
                    <Stack gap="20" flex="1">
                        {POLICY_SECTIONS.map((section) => (
                            <Stack key={section.id} gap="6">
                                <HStack gap="4">
                                    <Circle size="8" bg="gray.50" color="teal.600">
                                        <Database size={16} />
                                    </Circle>
                                    <Heading size="xl" fontWeight="900" letterSpacing="-0.02em">
                                        {section.title}
                                    </Heading>
                                </HStack>
                                <Text
                                    fontSize="xl"
                                    lineHeight="1.8"
                                    color="gray.600"
                                    maxW="3xl"
                                    fontWeight="medium"
                                >
                                    {section.content}
                                </Text>
                                <Separator borderColor="gray.50" />
                            </Stack>
                        ))}

                        {/* 3. Contact Box: High-End Rounded Container */}
                        <Box
                            bg="gray.50"
                            p="12"
                            rounded="3xl"
                            border="1px solid"
                            borderColor="gray.100"
                            mt="10"
                        >
                            <Stack gap="6">
                                <HStack gap="4">
                                    <Lock size={24} className="text-teal-600" />
                                    <Heading size="lg" fontWeight="900">Privacy Concerns?</Heading>
                                </HStack>
                                <Text color="gray.600" fontSize="lg">
                                    If you have questions about how your data is handled, our Data Protection Officer is available at
                                    <Link color="teal.600" fontWeight="bold" ml="1">privacy@ecosystem.com</Link>
                                </Text>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}