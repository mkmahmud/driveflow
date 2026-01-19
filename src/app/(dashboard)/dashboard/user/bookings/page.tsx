"use client"

import {
    Box, Stack, Text, Heading, HStack, 
    Button, Flex, Image, Badge, 
    Separator, Icon, SimpleGrid, Circle
} from "@chakra-ui/react"
import { 
    Calendar, MapPin, ChevronRight, 
    Clock, ReceiptText, CarFront, Filter 
} from "lucide-react"
import { useState } from "react"

// Mock Data for Bookings
const BOOKINGS = [
    {
        id: "BK-9021",
        carName: "Porsche 911 Carrera",
        image: "https://wallpapercave.com/wp/wp8517595.jpg",
        startDate: "Oct 12, 2025",
        endDate: "Oct 15, 2025",
        total: 985,
        location: "Manhattan, NY",
        status: "UPCOMING",
    },
    {
        id: "BK-8842",
        carName: "Tesla Model S Plaid",
        image: "https://images.unsplash.com/photo-1617788131775-ceb2027fd12c?auto=format&fit=crop&q=80&w=400",
        startDate: "Sep 01, 2025",
        endDate: "Sep 04, 2025",
        total: 1200,
        location: "Brooklyn, NY",
        status: "COMPLETED",
    },
    {
        id: "BK-7721",
        carName: "Range Rover Sport",
        image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&q=80&w=400",
        startDate: "Aug 20, 2025",
        endDate: "Aug 22, 2025",
        total: 640,
        location: "Queens, NY",
        status: "CANCELLED",
    }
]

export default function UserBookingsPage() {
    const [filter, setFilter] = useState("ALL")

    return (
        <Stack gap="8" w="full">
            {/* Header Area */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap="4">
                <Box>
                    <Heading size="3xl" fontWeight="900" letterSpacing="tight">My Bookings</Heading>
                    <Text color="gray.500" fontSize="sm">Manage your past and upcoming trips.</Text>
                </Box>
                
                <HStack gap="2" bg="white" p="1" rounded="xl" border="1px solid" borderColor="gray.100" shadow="sm">
                    <FilterButton active={filter === "ALL"} onClick={() => setFilter("ALL")}>All</FilterButton>
                    <FilterButton active={filter === "UPCOMING"} onClick={() => setFilter("UPCOMING")}>Upcoming</FilterButton>
                    <FilterButton active={filter === "COMPLETED"} onClick={() => setFilter("COMPLETED")}>Completed</FilterButton>
                </HStack>
            </Flex>

            {/* Bookings List */}
            <Stack gap="4">
                {BOOKINGS.filter(b => filter === "ALL" || b.status === filter).map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}

                {/* Empty State (If no bookings) */}
                {BOOKINGS.length === 0 && (
                    <Center p="20" flexDirection="column" gap="4">
                        <Circle size="20" bg="gray.50"><CarFront size={40} className="text-gray-300" /></Circle>
                        <Text fontWeight="bold" color="gray.400">No bookings found</Text>
                        <Button colorPalette="teal" variant="outline" rounded="xl">Browse Cars</Button>
                    </Center>
                )}
            </Stack>
        </Stack>
    )
}

function BookingCard({ booking }: { booking: any }) {
    const statusColor = 
        booking.status === "UPCOMING" ? "teal" : 
        booking.status === "COMPLETED" ? "blue" : "red"

    return (
        <Box 
            bg="white" 
            rounded="3xl" 
            p="5" 
            border="1px solid" 
            borderColor="gray.100" 
            shadow="sm"
            transition="all 0.2s"
            _hover={{ shadow: "md", borderColor: "teal.100" }}
        >
            <Flex direction={{ base: "column", md: "row" }} gap="6" align={{ base: "stretch", md: "center" }}>
                {/* Car Image */}
                <Box w={{ base: "full", md: "200px" }} h="120px" rounded="2xl" overflow="hidden">
                    <Image src={booking.image} w="full" h="full" objectFit="cover" />
                </Box>

                {/* Details */}
                <Stack flex="1" gap="3">
                    <Flex justify="space-between" align="center">
                        <HStack gap="2">
                            <Badge colorPalette={statusColor} variant="subtle" rounded="full" px="3">
                                {booking.status}
                            </Badge>
                            <Text fontSize="xs" fontWeight="bold" color="gray.400">ID: {booking.id}</Text>
                        </HStack>
                        <Text fontWeight="900" fontSize="xl" color="teal.600">${booking.total}</Text>
                    </Flex>

                    <Heading size="md" fontWeight="bold">{booking.carName}</Heading>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                        <HStack color="gray.500">
                            <Calendar size={14} className="text-teal-600" />
                            <Text fontSize="xs" fontWeight="semibold">{booking.startDate} - {booking.endDate}</Text>
                        </HStack>
                        <HStack color="gray.500">
                            <MapPin size={14} className="text-teal-600" />
                            <Text fontSize="xs" fontWeight="semibold">{booking.location}</Text>
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* Actions */}
                <Separator orientation="vertical" h="80px" display={{ base: "none", md: "block" }} />
                
                <Stack direction={{ base: "row", md: "column" }} gap="2">
                    <Button variant="ghost" colorPalette="teal" size="sm" rounded="xl" gap="2">
                        <ReceiptText size={16} /> Invoice
                    </Button>
                    <Button colorPalette="teal" size="sm" rounded="xl" px="6" fontWeight="bold">
                        Manage <ChevronRight size={14} />
                    </Button>
                </Stack>
            </Flex>
        </Box>
    )
}

function FilterButton({ children, active, onClick }: any) {
    return (
        <Button
            size="sm"
            variant={active ? "solid" : "ghost"}
            colorPalette="teal"
            rounded="lg"
            px="6"
            onClick={onClick}
            bg={active ? "teal.600" : "transparent"}
            color={active ? "white" : "gray.600"}
        >
            {children}
        </Button>
    )
}

// Simple Center Helper
function Center({ children, ...props }: any) {
    return <Flex align="center" justify="center" {...props}>{children}</Flex>
}