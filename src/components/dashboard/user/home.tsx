import { Heading, Text, Stack, Grid, Box, CardBody, HStack, Icon, Flex, Badge, Separator, SkeletonCircle } from "@chakra-ui/react"
import { Card } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"
import { ArrowUpRight, Car, ChevronRight, DollarSign, MapPin, Timer, Users } from "lucide-react";
import { trpc } from "@/trpc/client";

export default function UserHome() {
    const { user } = useAuth();

    // Get My Total Bookings Count
    const { data: totalBookings, isLoading: isLoadingTotalBookings } = trpc.booking.getMyTotalBookingsCount.useQuery();

    // Get My Total Payments Count
    const { data: totalPayments, isLoading: isLoadingTotalPayments } = trpc.payment.getMyTotalSpent.useQuery();


    return (
        <Stack gap="8" p="2">
            {/* 1. Header Section */}
            <Flex justify="space-between" align="flex-end">
                <Stack gap="1">
                    <Heading size="2xl" fontWeight="900" letterSpacing="tight">
                        Welcome back, {user?.name?.split(' ')[0] || 'Driver'}!
                    </Heading>
                    <Text color="gray.500" fontSize="md">
                        Here's what's happening with your rentals today.
                    </Text>
                </Stack>
                <Badge variant="surface" colorPalette="teal" size="lg" borderRadius="full" px="4">
                    Pro Member
                </Badge>
            </Flex>

            {/* 2. Stats Grid */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
                <StatCard
                    label="Total Rides"
                    value={isLoadingTotalBookings ? <SkeletonCircle size="5" /> : totalBookings?.toString() || "0"}
                    icon={Car}
                    trend="+12"
                    color="teal"
                />
                <StatCard
                    label="Total Spends"
                    value={isLoadingTotalPayments ? <SkeletonCircle size="5" /> : `$${totalPayments?.toString() || "0"}`}
                    icon={DollarSign}
                    trend="2.1%"
                    color="orange"
                />
                <StatCard
                    label="Active Hours"
                    value="0"
                    icon={Timer}
                    trend="5%"
                    color="blue"
                />
            </Grid>

            {/* 3. Main Content Area */}
            <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap="6">
                {/* Active Trip Preview */}
                <Card.Root border="1px solid" borderColor="gray.100" bg="white" borderRadius="3xl" overflow="hidden">
                    <CardBody p="6">
                        <HStack justify="space-between" mb="6">
                            <Heading size="md" color={"black"}>Current Rental</Heading>
                            <Text fontSize="xs" fontWeight="bold" color="teal.600" cursor="pointer">VIEW DETAILS</Text>
                        </HStack>

                        <Flex gap="6" direction={{ base: "column", md: "row" }}>
                            <Box w={{ base: "full", md: "200px" }} h="120px" bg="gray.50" borderRadius="2xl" overflow="hidden">
                                <Box bg="gray.200" w="full" h="full" /> {/* Replace with Car Image */}
                            </Box>
                            <Stack flex="1" justify="center">
                                <Heading size="md" color={"black"}>Tesla Model 3 Dual Motor</Heading>
                                <HStack color="gray.500" fontSize="sm">
                                    <MapPin size={14} />
                                    <Text>Downtown Service Hub, SF</Text>
                                </HStack>
                                <HStack mt="2">
                                    <Badge colorPalette="green" variant="subtle">Active Now</Badge>
                                    <Text fontSize="xs" color="gray.400">Ends in 4 hours</Text>
                                </HStack>
                            </Stack>
                        </Flex>
                    </CardBody>
                </Card.Root>

                {/* Quick Shortcuts */}
                <Stack gap="4">
                    <Heading size="sm" color="gray.400" letterSpacing="widest" textTransform="uppercase">Quick Actions</Heading>
                    <Grid templateColumns="1fr 1fr" gap="4">
                        <ShortcutButton icon={Car} label="Book a Car" />
                        <ShortcutButton icon={Users} label="Refer Friend" />
                    </Grid>
                </Stack>
            </Grid>
        </Stack>
    )
}

// --- Sub-components to keep code clean ---

function StatCard({ label, value, icon: Icon, trend, color }: any) {
    return (
        <Card.Root border="1px solid" borderColor="gray.100" bg="white" borderRadius="3xl" transition="all 0.3s" _hover={{ borderColor: `${color}.200`, transform: "translateY(-2px)" }}>
            <CardBody p="6">
                <HStack justify="space-between" mb="4">
                    <Box p="2.5" borderRadius="xl" bg={`${color}.50`} color={`${color}.600`}>
                        <Icon size={20} />
                    </Box>
                    <HStack gap="1" color="green.500">
                        <ArrowUpRight size={14} />
                        <Text fontSize="xs" fontWeight="bold">{trend}</Text>
                    </HStack>
                </HStack>
                <Stack gap="0">
                    <Text color="black" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                        {label}
                    </Text>
                    <Heading color={"black"} size="xl" fontWeight="800">
                        {value}
                    </Heading>
                </Stack>
            </CardBody>
        </Card.Root>
    )
}

function ShortcutButton({ icon: Icon, label }: any) {
    return (
        <HStack
            p="4"
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ bg: "gray.50", borderColor: "teal.500" }}
        >
            <Icon size={18} />
            <Text fontWeight="bold" fontSize="sm">{label}</Text>
        </HStack>
    )
}