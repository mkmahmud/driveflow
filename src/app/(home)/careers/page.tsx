"use client"

import {
    Box, Container, Flex, Heading, Stack, Text,
    Grid, GridItem, Badge, HStack, Span, Button, Icon, Circle
} from "@chakra-ui/react"
import { ArrowRight, Briefcase, Coffee, Heart, Monitor, Sparkles } from "lucide-react"

const OPENINGS = [
    { title: "Senior Product Designer", team: "Design", location: "Remote / Dubai" },
    { title: "Fullstack Engineer (Next.js)", team: "Engineering", location: "Remote / Dhaka" },
    { title: "Growth Marketing Manager", team: "Marketing", location: "Remote / London" },
    { title: "Operations Lead", team: "Logistics", location: "Dubai, UAE" }
]

export default function CareersPage() {
    return (
        <Box bg="white" minH="100vh" color="gray.900">

            {/* 1. HERO: Big Typographic Intro */}
            <Box pt="32" pb="20" borderBottom="1px solid" borderColor="gray.100">
                <Container maxW="7xl">
                    <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap="10">
                        <GridItem colSpan={{ base: 1, lg: 8 }}>
                            <Badge variant="subtle" colorPalette="teal" px="4" rounded="full" mb="6">
                                WE ARE HIRING
                            </Badge>
                            <Heading fontSize={{ base: "5xl", md: "8xl" }} fontWeight="900" letterSpacing="-0.05em" lineHeight="0.9">
                                Build the <br />
                                <Span color="teal.500">Future Mobility.</Span>
                            </Heading>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, lg: 4 }} alignSelf="flex-end">
                            <Text fontSize="xl" color="gray.500" fontWeight="medium" borderLeft="4px solid" borderColor="teal.500" pl="6">
                                We are a team of dreamers and doers reimagining the relationship between people and vehicles.
                            </Text>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>

            {/* 2. PERKS: Modular Bento Grid */}
            <Box py="24" bg="gray.50/30">
                <Container maxW="7xl">
                    <Stack gap="12">
                        <Box>
                            <Text fontWeight="900" fontSize="xs" color="teal.600" letterSpacing="0.3em" mb="2">BENEFITS</Text>
                            <Heading size="2xl" fontWeight="900">Why join our ecosystem?</Heading>
                        </Box>

                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
                            <PerkCard icon={Monitor} title="Remote First" desc="Work from anywhere in the world. We value output over hours." />
                            <PerkCard icon={Heart} title="Health & Wellness" desc="Comprehensive insurance and annual wellness stipends for all." />
                            <PerkCard icon={Sparkles} title="Equity" desc="Own a piece of the company. Every employee is an owner here." />
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            {/* 3. OPEN POSITIONS: Clean Bordered List */}
            <Container maxW="7xl" py="24">
                <Stack gap="12">
                    <Flex justify="space-between" align="baseline">
                        <Heading size="2xl" fontWeight="900">Open Positions</Heading>
                        <Text fontWeight="bold" color="gray.400">{OPENINGS.length} Roles Available</Text>
                    </Flex>

                    <Box borderTop="1px solid" borderColor="gray.900">
                        {OPENINGS.map((job, idx) => (
                            <Flex
                                key={idx}
                                py="8"
                                px="4"
                                justify="space-between"
                                align="center"
                                borderBottom="1px solid"
                                borderColor="gray.100"
                                _hover={{ bg: "gray.50" }}
                                transition="all 0.2s"
                                cursor="pointer"
                                direction={{ base: "column", md: "row" }}
                                gap="4"
                                 
                            >
                                <Stack gap="1">
                                    <Heading size="lg" fontWeight="900">{job.title}</Heading>
                                    <HStack color="gray.500" fontSize="sm" fontWeight="bold">
                                        <Text>{job.team}</Text>
                                        <Circle size="1" bg="gray.300" />
                                        <Text>{job.location}</Text>
                                    </HStack>
                                </Stack>

                                <Button
                                    variant="outline"
                                    rounded="xl"
                                    borderColor="gray.900"
                                    fontWeight="900"
                                    _groupHover={{ bg: "gray.900", color: "white" }}
                                 >
                                    Apply Now
                                </Button>
                            </Flex>
                        ))}
                    </Box>
                </Stack>
            </Container>

            {/* 4. CTA: Minimal Dark Section */}
            <Box py="20">
                <Container maxW="7xl">
                    <Box bg="gray.900" color="white" p={{ base: "10", md: "20" }} rounded="3xl" textAlign="center">
                        <Stack gap="6" align="center">
                            <Heading size="2xl" fontWeight="900">Don't see a fit?</Heading>
                            <Text fontSize="lg" opacity="0.7" maxW="xl">
                                We're always looking for exceptional talent. Send your portfolio to
                                <Span color="teal.400" fontWeight="bold"> talent@ecosystem.com</Span>
                            </Text>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

function PerkCard({ icon: IconComponent, title, desc }: any) {
    return (
        <Stack p="10" borderWidth="1px" borderColor="gray.100" rounded="3xl" bg="white">
            <Circle size="12" bg="teal.50" color="teal.600" mb="4">
                <IconComponent size={24} />
            </Circle>
            <Heading size="md" fontWeight="900">{title}</Heading>
            <Text color="gray.600" lineHeight="tall">{desc}</Text>
        </Stack>
    )
}