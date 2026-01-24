"use client"

import {
    Box, Container, SimpleGrid, Flex, Text, Heading, Stack,
    Separator, HStack, Button, Grid, Badge, Icon, Skeleton
} from "@chakra-ui/react"
import { X, SlidersHorizontal, ChevronDown, MapPin } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { CarCard } from "@/components/cards/carCard"
import { trpc } from "@/trpc/client"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
    const searchParams = useSearchParams();

    // Values from URL or defaults
    const location = searchParams.get("location") || "Dhaka";
    const startDate = searchParams.get("startDate") || new Date().toISOString();
    const endDate = searchParams.get("endDate") || new Date().toISOString();

    // Filter States
    const [priceRange, setPriceRange] = useState([50, 1000])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    // REAL DATA QUERY
    const { data: cars, isLoading } = trpc.car.getAllCars.useQuery({
        location,
        startDate,
        endDate,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        types: selectedTypes,
    });

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    return (
        <Box bg="gray.50/50" minH="100vh">
            <Container maxW="breakpoint-xl" py="10">
                <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap="12">

                    {/* SIDEBAR FILTERS (Your Design) */}
                    <Stack
                        gap="8"
                        as="aside"
                        position={{ lg: "sticky" }}
                        top="100px"
                        h="fit-content"
                        bg="white"
                        p="6"
                        rounded="2xl" 
                    >
                        <Flex align="center" gap="2" mb="2">
                            <SlidersHorizontal size={18} />
                            <Text fontWeight="bold" fontSize="lg">Filters</Text>
                        </Flex>

                        {/* Price Range Slider */}
                        <Stack gap="4">
                            <Flex justify="space-between" align="center">
                                <Text fontWeight="semibold" fontSize="sm">Price per day</Text>
                                <Badge bg={"white"} color="teal.600" fontWeight="bold" fontSize="md" px="3" py="1.5" rounded="full" borderWidth="1px" borderColor="teal.100">
                                    ${priceRange[0]} - ${priceRange[1]}
                                </Badge>
                            </Flex>
                            <Slider
                                min={0}
                                max={10000}
                                step={10}
                                value={priceRange}
                                onValueChange={(e) => setPriceRange(e.value)}
                                colorPalette="teal"
                            />
                        </Stack>

                        <Separator borderColor="gray.50" />

                        {/* Vehicle Type Checklist */}
                        <Stack gap="4">
                            <Text fontWeight="semibold" fontSize="sm">Vehicle Type</Text>
                            <Stack gap="3">
                                {["Sedan", "SUV", "Luxury", "Electric", "Sports"].map((type) => (
                                    <Checkbox
                                        key={type}
                                        colorPalette="teal"
                                        variant="subtle"
                                        checked={selectedTypes.includes(type)}
                                        onCheckedChange={() => toggleType(type)}
                                    >
                                        <Text fontSize="sm" fontWeight="medium" color="gray.700">{type}</Text>
                                    </Checkbox>
                                ))}
                            </Stack>
                        </Stack>

                        <Separator borderColor="gray.50" />

                        <Button
                            variant="ghost"
                            color="gray.500"
                            fontWeight="medium"
                            rounded="xl"
                            size="sm"
                            w="full"
                            mt="4"
                            onClick={() => { setSelectedTypes([]); setPriceRange([50, 400]) }}
                            _hover={{ bg: "red.50", color: "red.500" }}
                        >
                            Reset All Filters
                        </Button>
                    </Stack>

                    {/* RESULTS AREA (Your Design) */}
                    <Box>
                        {/* Header Section */}
                        <Stack gap="6" mb="8">
                            <HStack fontSize="xs" color="gray.400" gap="2" fontWeight="medium">
                                <Text cursor="pointer" _hover={{ color: "teal.500" }}>Home</Text>
                                <Text>/</Text>
                                <Text color="gray.900">Search Results</Text>
                            </HStack>

                            <Flex justify="space-between" align="center" wrap="wrap" gap="4">
                                <Box>
                                    <Heading size="4xl" fontWeight="black" letterSpacing="tight">
                                        Find Your Drive
                                    </Heading>
                                    <HStack mt="2" color="gray.500">
                                        <MapPin size={14} />
                                        <Text fontSize="sm">{isLoading ? "Searching..." : `${cars?.length || 0} cars available in`} <b>{location}</b> </Text>
                                    </HStack>
                                </Box>

                                <Button variant="solid" rounded="full" size="sm" px="4" bg="white" border="1px solid" borderColor="gray.200">
                                    Sort by: Recommended <ChevronDown size={14} />
                                </Button>
                            </Flex>

                            {/* Active Filter Chips */}
                            {selectedTypes.length > 0 && (
                                <HStack gap="2" wrap="wrap">
                                    {selectedTypes.map(type => (
                                        <Badge
                                            key={type}
                                            variant="solid"
                                            colorPalette="teal"
                                            px="4"
                                            py="1.5"
                                            rounded="full"
                                            textTransform="none"
                                            fontSize="xs"
                                            display="flex"
                                            alignItems="center"
                                            gap="2"
                                        >
                                            {type}
                                            <X size={14} style={{ cursor: 'pointer' }} onClick={() => toggleType(type)} />
                                        </Badge>
                                    ))}
                                </HStack>
                            )}
                        </Stack>

                        {/* Grid of Real Cars */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                            {isLoading ? (
                                [1, 2, 3, 4].map(i => <Skeleton key={i} h="400px" rounded="3xl" />)
                            ) : cars && cars.length > 0 ? (
                                cars.map(car => (
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
                                ))
                            ) : (
                                <Box gridColumn="1/-1" py="20" textAlign="center">
                                    <Text color="gray.400" fontSize="lg">No cars found matching your criteria.</Text>
                                </Box>
                            )}
                        </SimpleGrid>

                        {!isLoading && cars && cars.length > 0 && (
                            <Flex justify="center" mt="12">
                                <Button variant="surface" rounded="xl" px="10">
                                    Load More Vehicles
                                </Button>
                            </Flex>
                        )}
                    </Box>
                </Grid>
            </Container>
        </Box>
    )
}