"use client"

import {
    Box, Container, SimpleGrid, Flex, Text, Heading, Stack,
    Separator, HStack, Button, Grid, Badge
} from "@chakra-ui/react"
import { Filter, MapPin, Calendar, X } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox" // From snippet
import { Slider } from "@/components/ui/slider"     // From snippet
import { useState } from "react"
import { FeaturedCard } from "@/components/cards/featuredCard"

export default function SearchPage() {
    const [priceRange, setPriceRange] = useState([50, 400])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    return (
        <Container maxW="breakpoint-xl" py="10">


            <Grid templateColumns={{ base: "1fr", lg: "280px 1fr" }} gap="10">

                {/* SIDEBAR FILTERS */}
                <Stack gap="8" as="aside"   >

                    {/* Price Range Slider */}
                    <Stack gap="5">
                        <Flex justify="space-between" align="baseline">
                            <Text fontWeight="bold">Price Range</Text>
                            <Text fontSize="xs" color="primary" fontWeight="bold">
                                ${priceRange[0]} - ${priceRange[1]}
                            </Text>
                        </Flex>
                        <Slider
                            min={0}
                            max={1000}
                            step={10}
                            defaultValue={priceRange}
                            onValueChange={(e) => setPriceRange(e.value)}
                            colorPalette="teal"
                        />
                        <HStack justify="space-between" color="gray.500" fontSize="xs">
                            <Text>$0</Text>
                            <Text>$1000+</Text>
                        </HStack>
                    </Stack>

                    <Separator />

                    {/* Vehicle Type Checklist */}
                    <Stack gap="4">
                        <Text fontWeight="bold">Vehicle Type</Text>
                        <Stack gap="3">
                            {["Sedan", "SUV", "Luxury", "Electric", "Sports"].map((type) => (
                                <Checkbox
                                    key={type}
                                    colorPalette="teal"
                                    checked={selectedTypes.includes(type)}
                                    onCheckedChange={() => toggleType(type)}
                                >
                                    <Text fontSize="sm">{type}</Text>
                                </Checkbox>
                            ))}
                        </Stack>
                    </Stack>

                    <Separator />

                    {/* Features */}
                    <Stack gap="4">
                        <Text fontWeight="bold">Instant Features</Text>
                        <Stack gap="3">
                            <Checkbox colorPalette="teal"><Text fontSize="sm">Instant Book</Text></Checkbox>
                            <Checkbox colorPalette="teal"><Text fontSize="sm">Self Check-in</Text></Checkbox>
                            <Checkbox colorPalette="teal"><Text fontSize="sm">Unlimited Miles</Text></Checkbox>
                        </Stack>
                    </Stack>

                    <Button
                        variant="outline"
                        rounded="xl"
                        size="sm"
                        onClick={() => { setSelectedTypes([]); setPriceRange([50, 400]) }}
                    >
                        Reset Filters
                    </Button>
                </Stack>

                {/* RESULTS AREA */}
                <Box>
                    {/* Header Section */}
                    <Stack gap="2" mb="8">
                        <HStack fontSize="xs" color="gray.500" gap="2">
                            <Text>Home</Text> <Text>/</Text> <Text color="primary">Search Results</Text>
                        </HStack>
                        <Flex justify="space-between" align="flex-end">
                            <Box>
                                <Heading size="3xl" fontWeight="black">Find Your Drive</Heading>
                                <Text color="gray.500" mt="1">Showing 124 cars available in New York</Text>
                            </Box>
                        </Flex>
                    </Stack>
                    {/* Filter Chips / Active Filters */}
                    <HStack gap="2" mb="6" wrap="wrap">
                        {selectedTypes.map(type => (
                            <Badge key={type} variant="subtle" colorPalette="teal" px="3" py="1" rounded="full" textTransform="none">
                                {type} <X size={12} style={{ display: 'inline', marginLeft: '4px', cursor: 'pointer' }} onClick={() => toggleType(type)} />
                            </Badge>
                        ))}
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                        {/* We reuse the CarCard from the featured section */}
                    </SimpleGrid>
                </Box>
            </Grid>
        </Container>
    )
}