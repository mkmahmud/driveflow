"use client"

import { FeaturedCard } from "@/components/cards/featuredCard"
import { Box, Heading, Flex, Container, Text, Stack, IconButton, HStack } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

const FEATURED_CARS = [
    { id: 1, name: "Tesla Model S", price: 150, seats: 5, type: "Electric", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=500" },
    { id: 2, name: "BMW M4 Competition", price: 200, seats: 4, type: "Luxury", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=500" },
    { id: 3, name: "Range Rover Sport", price: 180, seats: 7, type: "SUV", image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=500" },
    { id: 4, name: "Porsche 911", price: 250, seats: 2, type: "Sport", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=500" },
]

export default function FeaturedCars() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <Container   py="20"  w="full"  maxW="full">
            {/* HEADER: Left Content / Right Buttons */}
            <Flex justify="space-between" align="flex-end" mb="10">
                <Stack gap="2">
                    <Text color="teal.500" fontWeight="bold" fontSize="sm" textTransform="uppercase" letterSpacing="widest">
                        Top Selection
                    </Text>
                    <Heading size="3xl" fontWeight="extrabold">
                        Featured Listing Cars
                    </Heading>
                </Stack>

                <HStack gap="4">
                    <IconButton
                        aria-label="Scroll Left"
                        variant="outline"
                        rounded="full"
                        onClick={() => scroll("left")}
                        _hover={{ bg: "teal.500", color: "white", borderColor: "teal.500" }}
                    >
                        <ChevronLeft size={20} />
                    </IconButton>
                    <IconButton
                        aria-label="Scroll Right"
                        variant="outline"
                        rounded="full"
                        onClick={() => scroll("right")}
                        _hover={{ bg: "teal.500", color: "white", borderColor: "teal.500" }}
                    >
                        <ChevronRight size={20} />
                    </IconButton>
                </HStack>
            </Flex>

            {/* SCROLLABLE GRID */}
            <Box
                ref={scrollRef}
                display="flex"
                gap="6"
                overflowX="auto"
                pb="8"
                css={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    'msOverflowStyle': 'none',
                    'scrollbarWidth': 'none',
                    'scrollSnapType': 'x mandatory'
                }}
            >
                {FEATURED_CARS.map((car) => (
                    <Box
                        key={car.id}
                        minW={{ base: "300px", md: "380px" }}
                        scrollSnapAlign="start"
                    >
                        <FeaturedCard {...car} />
                    </Box>
                ))}
            </Box>
        </Container>
    )
}