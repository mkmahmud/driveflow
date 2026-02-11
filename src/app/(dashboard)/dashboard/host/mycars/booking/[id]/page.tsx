"use client"

import {
    Box, Flex, Stack, Heading, Text, Badge, HStack, Grid,
    Image, Button, Circle, VStack, SimpleGrid,
    Center, Spinner,
    Avatar,
    IconButton
} from "@chakra-ui/react"
import {
    ChevronLeft, ShieldCheck,
    MapPin, Flag,
    ArrowRightLeft, Gauge, Fuel,
    ExternalLink
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { trpc } from "@/trpc/client"
import { format } from "date-fns"

export default function HostManageBookingPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string

    const { data: booking, isLoading } = trpc.booking.getBookingDetails.useQuery({ id })

    const returnPhotos = booking?.returnPhotos || [];

    // trpc mutation for handover
    const { mutateAsync: vehicleStatus } = trpc.booking.returnorHandover.useMutation();

    const handleHandover = async () => {
        try {
            await vehicleStatus({
                bookingId: id,
                handoverStatus: "COMPLETED",
            });
            alert("Vehicle handover completed successfully!");
        } catch (error) {
            alert("An error occurred during handover. Please try again.");
        }
    }
    const acceptVehicle = async () => {
        try {
            await vehicleStatus({
                bookingId: id,
                returnInspections: "COMPLETED",
            });
            alert("Vehicle return inspection completed successfully!");
        } catch (error) {
            alert("An error occurred during return inspection. Please try again.");
        }
    }

    if (isLoading) return <Center h="80vh"><Spinner size="xl" color="teal.500" /></Center>
    if (!booking) return <Center h="80vh">Booking data not found.</Center>

    return (
        <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
            {/* Header / Navigation */}
            <Flex justify="space-between" align="center" mb={10}>
                <HStack gap={4}>
                    <Circle
                        size="10" border="1px solid" borderColor="gray.200"
                        cursor="pointer" onClick={() => router.back()}
                        _hover={{ bg: "gray.50" }}
                    >
                        <ChevronLeft size={20} />
                    </Circle>
                    <VStack align="flex-start" gap={0}>
                        <Text fontSize="10px" fontWeight="black" color="gray.400" letterSpacing="0.2em">MANAGEMENT TERMINAL</Text>
                        <Heading size="lg" fontWeight="900">Trip #{booking.id.toUpperCase().slice(-6)}</Heading>
                    </VStack>
                </HStack>
                <Badge colorPalette="teal" variant="surface" px={4} py={1} rounded="full" fontWeight="black">
                    {booking.status}
                </Badge>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={10}>

                {/* LEFT COLUMN: THE HANDOVER INTERFACE */}
                <Stack gap={8}>

                    {/* 1. VEHICLE & USER SUMMARY */}
                    <Box p={6} border="1px solid" borderColor="gray.100" rounded="3xl" bg="white">
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                            <HStack gap={4}>
                                <Image src={booking.car.image} w="120px" h="80px" rounded="2xl" objectFit="cover" />
                                <VStack align="flex-start" gap={0}>
                                    <Heading size="sm" fontWeight="800">{booking.car.name}</Heading>
                                    <HStack mt={1} color="teal.600">
                                        <ShieldCheck size={12} />
                                        <Text fontSize="10px" fontWeight="black">FULLY INSURED</Text>
                                    </HStack>
                                </VStack>
                            </HStack>

                            <HStack gap={4} bg="gray.50" p={4} rounded="2xl">
                                <Circle size="10" bg="white" border="1px solid" borderColor="gray.200">
                                    <Avatar.Root size="lg" shape="rounded">
                                        {/* @ts-ignore */}
                                        <Avatar.Image src={booking?.user?.image} />
                                        {/* @ts-ignore */}
                                        <Avatar.Fallback name={booking?.user?.name} />
                                    </Avatar.Root>
                                </Circle>
                                <VStack align="flex-start" gap={0}>
                                    <Text fontSize="xs" fontWeight="black">TENANT</Text>
                                    <Text fontWeight="bold">{booking?.user?.name}</Text>
                                    <Text fontSize="10px" color="gray.500">Verified Driver • {booking?.user?.email}</Text>
                                </VStack>
                            </HStack>
                        </SimpleGrid>
                    </Box>


                    {/* 2. INSPECTION & PHOTOS */}
                    {
                        booking?.pickupPhotos && booking.pickupPhotos.length > 0 && <Box p={8} border="1px solid" borderColor="gray.100" rounded="3xl">
                            <Heading size="xs" fontWeight="black" mb={6} letterSpacing="0.1em">HANDOVER INSPECTION</Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={8}>
                                {booking?.pickupPhotos.map((url, index) => (
                                    <Box
                                        key={index}
                                        bg="white"
                                        p={4}
                                        w={'full'}
                                        rounded="2xl"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        transition="all 0.2s"
                                        _hover={{ borderColor: "emerald.400" }}
                                    >
                                        <Flex justify="space-between" align="center" mb={4}>

                                            <IconButton
                                                size="xs"
                                                onClick={() => window.open(url, "_blank")}
                                                aria-label="View original"
                                            >
                                                <ExternalLink size={14} />
                                            </IconButton>
                                        </Flex>

                                        <Box rounded="xl" overflow="hidden" bg="gray.50" border="1px solid" borderColor="gray.100">
                                            <Image
                                                src={url}
                                                alt="KYC Document"
                                                w="full"
                                                h="full"
                                                objectFit="contain"
                                                p={2}

                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </SimpleGrid>

                            {/* Key handover */}
                            <Button variant="surface" colorPalette="teal" onClick={handleHandover}   >
                                Handover Vehicle
                            </Button>
                        </Box>
                    }
                    {/* 2. INSPECTION & PHOTOS */}
                    {
                        booking?.returnPhotos && booking.returnPhotos.length > 0 && <Box p={8} border="1px solid" borderColor="gray.100" rounded="3xl">
                            <Heading size="xs" fontWeight="black" mb={6} letterSpacing="0.1em">Return INSPECTION</Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={8}>
                                {booking?.returnPhotos.map((url, index) => (
                                    <Box
                                        key={index}
                                        bg="white"
                                        p={4}
                                        w={'full'}
                                        rounded="2xl"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        transition="all 0.2s"
                                        _hover={{ borderColor: "emerald.400" }}
                                    >
                                        <Flex justify="space-between" align="center" mb={4}>

                                            <IconButton
                                                size="xs"
                                                onClick={() => window.open(url, "_blank")}
                                                aria-label="View original"
                                            >
                                                <ExternalLink size={14} />
                                            </IconButton>
                                        </Flex>

                                        <Box rounded="xl" overflow="hidden" bg="gray.50" border="1px solid" borderColor="gray.100">
                                            <Image
                                                src={url}
                                                alt="KYC Document"
                                                w="full"
                                                h="full"
                                                objectFit="contain"
                                                p={2}

                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </SimpleGrid>

                            {/* Key handover */}
                            <Button variant="surface" colorPalette="teal" onClick={acceptVehicle}   >
                                Accept Vehicle
                            </Button>
                        </Box>
                    }





                </Stack>

                {/* RIGHT COLUMN: TIMELINE & LOGISTICS */}
                <Stack gap={6}>
                    <Box p={8} border="1px solid" borderColor="gray.100" rounded="3xl">
                        <Heading size="xs" fontWeight="black" mb={8} letterSpacing="0.1em">TRIP TIMELINE</Heading>
                        <VStack align="stretch" gap={0}>
                            <TimelineItem
                                icon={<MapPin size={14} />}
                                title="Pickup Location"
                                value={booking.car.location}
                                time={format(new Date(booking.startDate), "MMM dd, hh:mm a")}
                                isDone
                            />
                            <TimelineItem
                                icon={<Flag size={14} />}
                                title="Return Location"
                                value={booking.car.location}
                                time={format(new Date(booking.endDate), "MMM dd, hh:mm a")}
                            />
                        </VStack>
                    </Box>

                    <Box p={8} border="1px solid" borderColor="gray.100" rounded="3xl">
                        <Heading size="xs" fontWeight="black" mb={6} letterSpacing="0.1em">QUICK SPECS</Heading>
                        <VStack align="stretch" gap={4}>
                            <SpecRow icon={Gauge} label="Mileage Limit" value="Unlimited" />
                            <SpecRow icon={Fuel} label="Fuel Type" value="Premium / Electric" />
                            <SpecRow icon={ArrowRightLeft} label="Transmission" value="Automatic" />
                        </VStack>
                    </Box>
                </Stack>
            </Grid>
        </Box>
    )
}



function TimelineItem({ icon, title, value, time, isDone }: any) {
    return (
        <HStack align="flex-start" gap={4} mb={8} position="relative">
            <Circle size="8" bg={isDone ? "teal.500" : "gray.100"} color={isDone ? "white" : "gray.400"}>
                {icon}
            </Circle>
            <VStack align="flex-start" gap={0}>
                <Text fontSize="xs" fontWeight="black" color={isDone ? "black" : "gray.400"}>{title}</Text>
                <Text fontSize="sm" fontWeight="bold">{value}</Text>
                <Text fontSize="10px" color="gray.500" mt={1}>{time}</Text>
            </VStack>
        </HStack>
    )
}

function SpecRow({ icon: Icon, label, value }: any) {
    return (
        <HStack justify="space-between">
            <HStack color="gray.500">
                <Icon size={14} />
                <Text fontSize="xs" fontWeight="bold">{label}</Text>
            </HStack>
            <Text fontSize="xs" fontWeight="black">{value}</Text>
        </HStack>
    )
}