"use client"

import {
    Box, Container, SimpleGrid, Flex, Text, Heading, Stack,
    Separator, HStack, Button, Grid, Badge, Icon
} from "@chakra-ui/react"
import { X, SlidersHorizontal, ChevronDown, MapPin } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
 import { CarCard } from "@/components/cards/carCard"

 const MOCK_CARS = [
    {
        id: 1,
        name: "Porsche 911 Carrera",
        image: "https://wallpapercave.com/wp/wp8517595.jpg",  
        price: 320,
        seats: 2,
        type: "Sports",
        rating: 4.9,
        transmission: "Automatic",
        fuelType: "Petrol"
    },
    {
        id: 2,
        name: "Tesla Model Y",
        image: "https://i.ytimg.com/vi/HD73VQTXIVI/sddefault.jpg",
        price: 120,
        seats: 5,
        type: "Electric",
        rating: 4.8,
        transmission: "Single-Speed",
        fuelType: "Electric"
    },
    {
        id: 3,
        name: "Range Rover Sport",
        image: "https://images.all-free-download.com/images/thumbjpg/car_picture_modern_realistic_elegance_6934668.jpg",
        price: 240,
        seats: 7,
        type: "Luxury",
        rating: 4.7,
        transmission: "Automatic",
        fuelType: "Hybrid"
    },
    {
        id: 4,
        name: "BMW 5 Series",
        image: "https://wallpapers.com/images/featured/lamborghini-lbun8b8ehlv3j8to.jpg",
        price: 150,
        seats: 5,
        type: "Sedan",
        rating: 4.6,
        transmission: "Automatic",
        fuelType: "Diesel"
    },
    {
        id: 5,
        name: "Mercedes G-Wagon",
        image: "https://cdn.wallpapersafari.com/50/98/mWCM5I.jpg",
        price: 450,
        seats: 5,
        type: "Luxury",
        rating: 5.0,
        transmission: "Automatic",
        fuelType: "Petrol"
    }
];

export default function SearchPage() {
    const [priceRange, setPriceRange] = useState([50, 400])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    return (
        <Box bg="gray.50/50" minH="100vh">
            <Container maxW="breakpoint-xl" py="10">
                <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap="12">

                    {/* SIDEBAR FILTERS */}
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
                                max={1000}
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

                        {/* Features */}
                        <Stack gap="4">
                            <Text fontWeight="semibold" fontSize="sm">Instant Features</Text>
                            <Stack gap="3">
                                <Checkbox colorPalette="teal" size="sm"><Text fontSize="sm">Instant Book</Text></Checkbox>
                                <Checkbox colorPalette="teal" size="sm"><Text fontSize="sm">Self Check-in</Text></Checkbox>
                                <Checkbox colorPalette="teal" size="sm"><Text fontSize="sm">Unlimited Miles</Text></Checkbox>
                            </Stack>
                        </Stack>

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

                    {/* RESULTS AREA */}
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
                                        <Text fontSize="sm">124 cars available in New York</Text>
                                    </HStack>
                                </Box>

                                <Button variant="solid" rounded="full" size="sm" px="4">
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
                                            <X
                                                size={14}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleType(type)}
                                            />
                                        </Badge>
                                    ))}
                                </HStack>
                            )}
                        </Stack>

                        {/* Grid of Cars */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                            {/* Example Placeholder Cards */}
                            {

                                MOCK_CARS.map(car => <CarCard key={car.id} {...car} />)


                            }
                        </SimpleGrid>

                        {/* Pagination or Load More (Optional) */}
                        <Flex justify="center" mt="12">
                            <Button variant="surface" rounded="xl" px="10">
                                Load More Vehicles
                            </Button>
                        </Flex>
                    </Box>
                </Grid>
            </Container>
        </Box>
    )
}