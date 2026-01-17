"use client"

import { FeaturedCard } from "@/components/cards/featuredCard"
import { Box, Heading, Flex, Container, Text, Stack, IconButton, HStack } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

const FEATURED_CARS = [
    {
        id: 1,
        name: "Tesla Model S",
        price: 150,
        seats: 5,
        type: "Electric",
        rating: 4.8,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "BMW M4 Competition",
        price: 200,
        seats: 4,
        type: "Luxury",
        rating: 4.9,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Range Rover Sport",
        price: 180,
        seats: 7,
        type: "SUV",
        rating: 4.7,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Porsche 911",
        price: 250,
        seats: 2,
        type: "Sport",
        rating: 4.9,
        transmission: "Manual",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Audi Q7",
        price: 160,
        seats: 7,
        type: "SUV",
        rating: 4.6,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Mercedes-Benz S-Class",
        price: 220,
        seats: 5,
        type: "Luxury",
        rating: 4.9,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500&auto=format&fit=crop"
    },
]

export default function FeaturedCars() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollAmount = clientWidth * 0.8
            const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <Box bg="gray.50" py="20" w="full">
            <Container maxW="7xl" px={{ base: "4", md: "8", lg: "12" }}>
                {/* HEADER */}
                <Flex
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    mb="12"
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: "6", md: "0" }}
                >
                    <Stack gap="3">
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
                                TOP SELECTION
                            </Text>
                        </Box>
                        <Stack gap="1">
                            <Heading
                                color="#1E293B"
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                fontWeight="bold"
                                lineHeight="1.1"
                            >
                                Featured
                                <Box
                                    as="span"
                                    color="#0D9488"
                                    ml="2"
                                >
                                    Premium Cars
                                </Box>
                            </Heading>
                            <Text
                                color="#64748B"
                                fontSize={{ base: "lg", md: "xl" }}
                                maxW="2xl"
                            >
                                Discover our curated collection of premium vehicles
                            </Text>
                        </Stack>
                    </Stack>

                    <HStack gap="3">
                        <IconButton
                            aria-label="Scroll Left"
                            variant="outline"
                            rounded="full"
                            size="lg"
                            onClick={() => scroll("left")}
                            borderColor="#E2E8F0"
                            color="#64748B"
                            _hover={{
                                bg: "#0D9488",
                                color: "white",
                                borderColor: "#0D9488",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(13, 148, 136, 0.2)"
                            }}
                            transition="all 0.2s ease"
                        >
                            <ChevronLeft size={20} />
                        </IconButton>
                        <IconButton
                            aria-label="Scroll Right"
                            variant="outline"
                            rounded="full"
                            size="lg"
                            onClick={() => scroll("right")}
                            borderColor="#E2E8F0"
                            color="#64748B"
                            _hover={{
                                bg: "#0D9488",
                                color: "white",
                                borderColor: "#0D9488",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(13, 148, 136, 0.2)"
                            }}
                            transition="all 0.2s ease"
                        >
                            <ChevronRight size={20} />
                        </IconButton>
                    </HStack>
                </Flex>

                {/* SCROLLABLE CARDS */}
                <Box position="relative">
                    <Box
                        ref={scrollRef}
                        display="flex"
                        gap={{ base: "4", md: "6", lg: "8" }}
                        overflowX="auto"
                        pb="8"
                        scrollBehavior="smooth"
                        css={{
                            '&::-webkit-scrollbar': {
                                height: '6px',
                                backgroundColor: 'transparent'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#CBD5E1',
                                borderRadius: '3px'
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent'
                            },
                            'scrollbarWidth': 'thin',
                            'scrollbarColor': '#CBD5E1 transparent'
                        }}
                    >
                        {FEATURED_CARS.map((car) => (
                            <Box
                                key={car.id}
                                minW={{ base: "280px", sm: "320px", md: "360px", lg: "380px" }}
                                flexShrink={0}
                            >
                                <FeaturedCard {...car} />
                            </Box>
                        ))}
                    </Box>

                    {/* Gradient fade effect on edges */}
                    <Box
                        position="absolute"
                        left="0"
                        top="0"
                        bottom="8"
                        w="60px"
                        bgGradient="linear(to-r, gray.50, transparent)"
                        pointerEvents="none"
                        zIndex="1"
                    />
                    <Box
                        position="absolute"
                        right="0"
                        top="0"
                        bottom="8"
                        w="60px"
                        bgGradient="linear(to-l, gray.50, transparent)"
                        pointerEvents="none"
                        zIndex="1"
                    />
                </Box>

                {/* View All Button */}
                <Flex justify="center" mt="12">
                    <Box
                        as="button"
                        bg="white"
                        border="1px solid"
                        borderColor="#E2E8F0"
                        color="#0D9488"
                        px="8"
                        py="3"
                        rounded="lg"
                        fontSize="md"
                        fontWeight="semibold"
                        _hover={{
                            bg: "#0D9488",
                            color: "white",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 24px rgba(13, 148, 136, 0.2)"
                        }}
                        transition="all 0.3s ease"
                    >
                        View All Cars
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}