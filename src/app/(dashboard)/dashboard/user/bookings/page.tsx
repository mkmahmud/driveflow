"use client"

import BookingCard from "@/components/dashboard/user/bookingCard"
import BookingCardSkeleton from "@/components/skeleton/bookingCardSkeleton"
import { trpc } from "@/trpc/client"
import {
    Box, Stack, Text, Heading, HStack,
    Button, Flex, Circle
} from "@chakra-ui/react"
import {
    CarFront
} from "lucide-react"
import { useState } from "react"

 
 

export default function UserBookingsPage() {
    const [filter, setFilter] = useState("ALL")

    // Get my bookings 
    const { data: myBookings, isLoading } = trpc.booking.getMyBookings.useQuery();
    console.log(myBookings);

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

                {
                    isLoading && <><BookingCardSkeleton /></>
                }

                {
                    !isLoading && myBookings?.filter((booking) => filter === "ALL" ? true : booking.status === filter).map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))
                }

                {/* Empty State (If no bookings) */}
                {myBookings?.length === 0 && (
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

