"use client"

import {
    Box,
    Flex,
    Stack,
    Image,
    Badge,
    Text,
    Heading,
    HStack,
    SimpleGrid,
    Button,
    Separator,
    Avatar,
} from "@chakra-ui/react";
import { Calendar, UserCheck, ShieldCheck, DollarSign } from "lucide-react";
import Link from "next/link";

const formatDate = (date: any) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const HostBookingCard = ({ booking }: { booking: any }) => {
    // Hosts care about the specific stage of the journey
    const isActionRequired = booking.status === "PENDING" || !booking.isIdentityVerified;

 
    return (
        <Box
            bg="white"
            rounded="3xl"
            p="5"
            border="1px solid"
            borderColor={isActionRequired ? "orange.100" : "gray.100"}
            transition="all 0.2s"
            position="relative"
            _hover={{ borderColor: "teal.200" }}
        >
            {isActionRequired && (
                <Badge
                    position="absolute" top="-2" left="6"
                    colorPalette="orange" variant="solid" rounded="full" px="3"
                >
                    Action Required
                </Badge>
            )}

            <Flex direction={{ base: "column", md: "row" }} gap="6" align="center">

                {/* Section 1: Tenant Info (Most Important for Host) */}
                <HStack w={{ base: "full", md: "240px" }} gap="4">
                    <Avatar.Root size="lg" shape="rounded">
                        <Avatar.Image src={booking.user.image} />
                        <Avatar.Fallback name={booking.user.name} />
                    </Avatar.Root>
                    <Stack gap="0">
                        <Text fontSize="xs" fontWeight="black" color="gray.400" letterSpacing="widest">TENANT</Text>
                        <Heading size="sm" fontWeight="800" className="truncate">{booking.user.name}</Heading>
                        <HStack gap="1" color={booking.isIdentityVerified ? "teal.500" : "gray.300"}>
                            <ShieldCheck size={12} />
                            <Text fontSize="10px" fontWeight="bold">
                                {booking.isIdentityVerified ? "ID VERIFIED" : "ID PENDING"}
                            </Text>
                        </HStack>
                    </Stack>
                </HStack>

                <Separator orientation="vertical" h="50px" display={{ base: "none", md: "block" }} />

                {/* Section 2: Trip & Vehicle Info */}
                <Stack flex="1" gap="2">
                    <HStack justify="space-between">
                        <Badge variant="subtle" colorPalette="teal" rounded="md">
                            {booking.car.name}
                        </Badge>
                        <HStack gap="1" color="gray.400">
                            <DollarSign size={14} />
                            <Text fontWeight="900" fontSize="md" color="black">
                                {booking.totalPrice}
                            </Text>
                        </HStack>
                    </HStack>

                    <SimpleGrid columns={2} gap="4">
                        <HStack color="gray.500">
                            <Calendar size={14} />
                            <Stack gap="0">
                                <Text fontSize="10px" fontWeight="bold" color="gray.400">RENTAL PERIOD</Text>
                                <Text fontSize="xs" fontWeight="bold">
                                    {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                                </Text>
                            </Stack>
                        </HStack>
                        <HStack color="gray.500">
                            <UserCheck size={14} />
                            <Stack gap="0">
                                <Text fontSize="10px" fontWeight="bold" color="gray.400">STATUS</Text>
                                <Text fontSize="xs" fontWeight="bold" color="teal.600">
                                    {booking.status}
                                </Text>
                            </Stack>
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* Section 3: Host Actions */}
                <Button
                    colorPalette="teal"
                    variant="surface"
                    size="sm"
                    rounded="xl"
                    px="6"
                    fontWeight="bold"

                >
                    <Link href={`/dashboard/host/mycars/booking/${booking.id}`} style={{ display: 'flex', alignItems: 'center' }}>


                        Manage Trip
                    </Link>
                </Button>
            </Flex>
        </Box>
    );
};

export default HostBookingCard;