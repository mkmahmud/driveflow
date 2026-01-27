"use client"

import {
    Box, Container, Flex, Heading, Stack, Text,
    Grid, GridItem, Badge, HStack, Span, Image, Circle,
    Separator
} from "@chakra-ui/react"
import { ArrowUpRight, Clock, Calendar } from "lucide-react"

const POSTS = [
    {
        id: 1,
        category: "LIFESTYLE",
        title: "The future of urban mobility in 2026",
        excerpt: "How autonomous sharing is changing the way we perceive car ownership in major metropolitan areas.",
        date: "Jan 24, 2026",
        readTime: "5 min read"
    },
    {
        id: 2,
        category: "TECH",
        title: "Digital Keys: The end of the physical handoff",
        excerpt: "Exploring the encryption technology behind our seamless app-to-car entry system.",
        date: "Jan 20, 2026",
        readTime: "4 min read"
    },
    {
        id: 3,
        category: "ROAD TRIPS",
        title: "Hidden gems: Coastal drives you can't miss",
        excerpt: "From the Amalfi Coast to the Pacific Highway, find the best routes for your next rental.",
        date: "Jan 15, 2026",
        readTime: "8 min read"
    }
]

export default function BlogPage() {
    return (
        <Box bg="white" minH="100vh" color="gray.900">

            {/* 1. HERO: Featured Post */}
            <Box pt="32" pb="20" borderBottom="1px solid" borderColor="gray.100">
                <Container maxW="7xl">
                    <Stack gap="8">
                        <HStack gap="4">
                            <Badge variant="solid" colorPalette="teal" rounded="full">FEATURED</Badge>
                            <Text fontSize="xs" fontWeight="900" letterSpacing="0.2em" color="gray.400">THE JOURNAL</Text>
                        </HStack>

                        <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap="12"  >
                            <GridItem colSpan={{ base: 1, lg: 8 }}>
                                <Heading fontSize={{ base: "4xl", md: "7xl" }} fontWeight="900" letterSpacing="-0.05em" lineHeight="0.9">
                                    The <Span color="teal.500">Art of the</Span> <br /> Modern Journey.
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={{ base: 1, lg: 4 }}>
                                <Stack gap="6">
                                    <Text fontSize="xl" color="gray.600" fontWeight="medium" lineHeight="tall">
                                        Exploring the intersection of luxury, technology, and the freedom of the open road.
                                    </Text>
                                    <HStack color="teal.600" fontWeight="900" cursor="pointer"  >
                                        <Text>READ THE STORY</Text>
                                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </HStack>
                                </Stack>
                            </GridItem>
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            {/* 2. BLOG GRID: Clean & Modular */}
            <Container maxW="7xl" py="20">
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap="12">
                    {POSTS.map((post) => (
                        <GridItem key={post.id}   cursor="pointer">
                            <Stack gap="6">
                                {/* Placeholder for Image - Clean Bordered Box */}
                                <Box
                                    h="300px"
                                    bg="gray.50"
                                    rounded="3xl"
                                    border="1px solid"
                                    borderColor="gray.100"
                                    transition="border-color 0.3s"
                                    _groupHover={{ borderColor: "teal.500" }}
                                    overflow="hidden"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text fontWeight="900" color="gray.200" fontSize="4xl">POST_IMG</Text>
                                </Box>

                                <Stack gap="4">
                                    <HStack justify="space-between">
                                        <Badge variant="subtle" colorPalette="teal" rounded="md">{post.category}</Badge>
                                        <HStack fontSize="xs" color="gray.400" fontWeight="bold">
                                            <Clock size={12} />
                                            <Text>{post.readTime}</Text>
                                        </HStack>
                                    </HStack>

                                    <Heading size="xl" fontWeight="900" letterSpacing="-0.02em" transition="color 0.2s" _groupHover={{ color: "teal.600" }}>
                                        {post.title}
                                    </Heading>

                                    <Text color="gray.500" fontSize="md"   lineHeight="tall">
                                        {post.excerpt}
                                    </Text>

                                    <Separator borderColor="gray.100" />

                                    <HStack justify="space-between">
                                        <Text fontSize="xs" fontWeight="900" color="gray.300">{post.date}</Text>
                                        <ArrowUpRight size={18} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
                                    </HStack>
                                </Stack>
                            </Stack>
                        </GridItem>
                    ))}
                </Grid>
            </Container>

            {/* 3. NEWSLETTER: Minimalist Callout */}
            <Box py="24" borderTop="1px solid" borderColor="gray.100">
                <Container maxW="3xl" textAlign="center">
                    <Stack gap="8">
                        <Circle size="12" bg="teal.600" color="white" mx="auto">
                            <ArrowUpRight size={20} />
                        </Circle>
                        <Heading size="2xl" fontWeight="900" letterSpacing="-0.04em">
                            Subscribe to the Journal
                        </Heading>
                        <Text color="gray.500" fontSize="lg">
                            Get the latest on new fleet additions, travel guides, and platform updates. No spam, just inspiration.
                        </Text>
                        <Flex
                            as="form"
                            direction={{ base: "column", md: "row" }}
                            gap="4"
                            pt="4"
                        >
                            <Box flex="1" borderBottom="2px solid" borderColor="gray.900">
                                <input
                                    placeholder="email@address.com"
                                    style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: '18px', fontWeight: '500' }}
                                />
                            </Box>
                            <Box
                                as="button"
                                bg="gray.900"
                                color="white"
                                px="10"
                                py="4"
                                rounded="xl"
                                fontWeight="900"
                                _hover={{ bg: "teal.600" }}
                                transition="all 0.2s"
                            >
                                JOIN
                            </Box>
                        </Flex>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}