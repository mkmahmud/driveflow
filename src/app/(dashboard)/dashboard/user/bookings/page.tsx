"use client"

import { Pagination } from "@/components/dashboard/Pagination"
import BookingCard from "@/components/dashboard/user/bookingCard"
import { BookingInvoiceModal } from "@/components/dashboard/user/bookingInvoiceModal"
import BookingCardSkeleton from "@/components/skeleton/bookingCardSkeleton"
import { trpc } from "@/trpc/client"
import {
    Box, Stack, Text, Heading, HStack,
    Button, Flex, Center
} from "@chakra-ui/react"
import { useState } from "react"

export default function UserBookingsPage() {
    const [filter, setFilter] = useState("ALL")
    const [selectedBooking, setSelectedBooking] = useState<any>(null)
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false)
    // Pagination
    const [page, setPage] = useState(1)
    const limit = 4;

    const handleInvoiceOpen = (booking: any) => {
        setSelectedBooking(booking)
        setIsInvoiceOpen(true)
    }

    //  data
    const { data: response, isLoading, isPlaceholderData } = trpc.booking.getMyBookings.useQuery(
        { page, limit },
        { placeholderData: (prev) => prev }
    )

    // Access bookings and meta safely
    const myBookings = response?.bookings || []


    // Client-side filter  
    const filteredBookings = myBookings.filter((booking: any) =>
        filter === "ALL" ? true : booking.status === filter
    )

    return (
        <Stack gap="8" w="full" position="relative">

            {/* Header Area */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap="4">
                <Box>
                    <Heading size="3xl" fontWeight="900" letterSpacing="tight">My Bookings</Heading>
                    <Text color="gray.500" fontSize="sm">Manage your past and upcoming trips.</Text>
                </Box>

                <HStack gap="1" bg="white" p="1" rounded="2xl" border="1px solid" borderColor="gray.100" shadow="xs">
                    <FilterButton active={filter === "ALL"} onClick={() => { setFilter("ALL"); setPage(1) }}>All</FilterButton>
                    <FilterButton active={filter === "UPCOMING"} onClick={() => { setFilter("UPCOMING"); setPage(1) }}>Upcoming</FilterButton>
                    <FilterButton active={filter === "COMPLETED"} onClick={() => { setFilter("COMPLETED"); setPage(1) }}>Completed</FilterButton>
                </HStack>
            </Flex>

            {/* Bookings List */}
            <Stack gap="4" minH="400px">
                {isLoading && !response ? (
                    <>
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                    </>
                ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((booking: any) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onInvoiceClick={() => handleInvoiceOpen(booking)}
                        />
                    ))
                ) : (
                    <Center p="20" flexDirection="column" gap="4" bg="gray.50/50" rounded="3xl" border="2px dashed" borderColor="gray.100">
                        <Stack align="center" gap="1">
                            <Text fontWeight="bold" color="gray.600">No {filter !== "ALL" ? filter.toLowerCase() : ""} bookings found</Text>
                            <Text fontSize="sm" color="gray.400">Time to hit the road! Browse our latest fleet.</Text>
                        </Stack>
                        <Button colorPalette="teal" variant="solid" rounded="xl" mt="2" px="8">
                            Browse Cars
                        </Button>
                    </Center>
                )}
            </Stack>

            {/* The Reusable Pagination */}
            {response?.meta && (
                <Pagination
                    currentPage={page}
                    totalPages={response.meta.totalPages}
                    totalCount={response.meta.totalCount}
                    onPageChange={(newPage) => setPage(newPage)}
                    isLoading={isPlaceholderData}
                />
            )}

            {/* Modal  */}
            <BookingInvoiceModal
                booking={selectedBooking}
                open={isInvoiceOpen}
                onOpenChange={(e: any) => setIsInvoiceOpen(e.open)}
            />
        </Stack>
    )
}

function FilterButton({ children, active, onClick }: any) {
    return (
        <Button
            size="sm"
            variant={active ? "solid" : "ghost"}
            rounded="xl"
            px="6"
            onClick={onClick}
            bg={active ? "teal.600" : "transparent"}
            color={active ? "white" : "gray.500"}
            _hover={active ? { bg: "teal.700" } : { bg: "gray.50", color: "teal.600" }}
            transition="all 0.2s"
            fontWeight={active ? "bold" : "medium"}
        >
            {children}
        </Button>
    )
}