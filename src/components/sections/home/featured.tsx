"use client"

import { CarCard } from "@/components/cards/carCard"
import { CarCardSkeleton } from "@/components/skeleton/carCardSkeleton"
import { trpc } from "@/trpc/client"
import { Box, Heading, Flex, Container, Text, Stack, IconButton, HStack } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"



export default function FeaturedCars() {
    const scrollRef = useRef<HTMLDivElement>(null)



    const { data: cars, isLoading } = trpc.car.getAllCarsForHome.useQuery();


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
                        {cars?.map((car) => (
                            <Box
                                key={car.id}
                                minW={{ base: "280px", sm: "320px", md: "360px", lg: "380px" }}
                                flexShrink={0}
                            >
                                <CarCard
                                    key={car.id}
                                    // @ts-ignore
                                    id={car.id}
                                    name={car.name}
                                    seats={car.seats}
                                    image={car.image}
                                    price={car.pricePerDay}
                                    type={car.type}
                                    transmission={car.transmission[0]}
                                    fuelType={car.fuelType}
                                    rating={4.9}
                                />
                            </Box>
                        ))}

                        {
                            isLoading && Array.from({ length: 4 }).map((_, index) => (
                                <Box
                                    key={index}
                                    minW={{ base: "280px", sm: "320px", md: "360px", lg: "380px" }}
                                    flexShrink={0}
                                >
                                    <CarCardSkeleton />
                                </Box>
                            ))
                        }

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