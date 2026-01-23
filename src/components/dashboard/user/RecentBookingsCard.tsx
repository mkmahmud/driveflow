"use client";

import {
    Box,
    Flex,
    Text,
    Badge,
    Avatar,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react";
import { RotateCcw } from "lucide-react";

type Booking = {
    id: string;
    vehicle: string;
    image: string;
    dateRange: string;
    status: "COMPLETED" | "PENDING" | "CANCELLED";
    total: number;
};

const bookings: Booking[] = [
    {
        id: "1",
        vehicle: "Porsche 911 GT3",
        image: "/cars/porsche.png",
        dateRange: "Oct 12 – Oct 14",
        status: "COMPLETED",
        total: 840,
    },
    {
        id: "2",
        vehicle: "Tesla Model S Plaid",
        image: "/cars/tesla.png",
        dateRange: "Sep 20 – Sep 22",
        status: "COMPLETED",
        total: 450,
    },
];

export default function RecentBookingsCard() {
    return (
        <Box
            bg="white"
            rounded="2xl"
            border="1px solid"
            borderColor="gray.200"
            overflow="hidden"
        >
            {/* HEADER */}
            <Flex
                px={6}
                py={4}
                align="center"
                justify="space-between"
            >
                <HStack  >
                    <Box
                        p="2"
                        bg="teal.50"
                        rounded="full"
                        color="teal.600"
                    >
                        <RotateCcw size={16} />
                    </Box>
                    <Text fontWeight="bold" fontSize="md">
                        Recent Bookings
                    </Text>
                </HStack>

                <Button
                    size="sm"
                    variant="ghost"
                    fontSize="sm"
                    color="gray.500"
                    _hover={{ color: "teal.600" }}
                >
                    View All
                </Button>
            </Flex>


            {/* TABLE HEADER */}
            <Flex
                px={6}
                py={3}
                fontSize="xs"
                fontWeight="semibold"
                color="gray.400"
                textTransform="uppercase"
            >
                <Box flex="2">Vehicle</Box>
                <Box flex="2">Date Range</Box>
                <Box flex="1">Status</Box>
                <Box flex="1" textAlign="right">
                    Total
                </Box>
            </Flex>


            {/* ROWS */}
            <VStack align="stretch">
                {bookings.map((booking, index) => (
                    <Box key={booking.id}>
                        <Flex
                            px={6}
                            py={4}
                            align="center"
                            fontSize="sm"
                        >
                            {/* VEHICLE */}
                            <HStack flex="2"  >
                                <Avatar.Root
                                    // @ts-ignore
                                    src={booking.image}
                                    size="sm"
                                    rounded="md"
                                    bg="gray.100"
                                />
                                <Text fontWeight="semibold">
                                    {booking.vehicle}
                                </Text>
                            </HStack>

                            {/* DATE */}
                            <Text flex="2" color="gray.600">
                                {booking.dateRange}
                            </Text>

                            {/* STATUS */}
                            <Box flex="1">
                                <Badge
                                    colorPalette="green"
                                    variant="subtle"
                                    rounded="full"
                                    px={3}
                                    py={1}
                                    fontSize="xs"
                                >
                                    {booking.status}
                                </Badge>
                            </Box>

                            {/* TOTAL */}
                            <Text
                                flex="1"
                                textAlign="right"
                                fontWeight="bold"
                            >
                                ${booking.total.toFixed(2)}
                            </Text>
                        </Flex>


                    </Box>
                ))}
            </VStack>
        </Box>
    );
}
