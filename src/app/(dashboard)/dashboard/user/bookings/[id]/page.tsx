"use client"

import {
    Box, Grid, Stack, Heading, Text, Badge, HStack, Flex,
    Button, Circle, Image, VStack, Center, Spinner,
    SimpleGrid, Icon, Checkbox,
    useDisclosure
} from "@chakra-ui/react"
import {
    MapPin, Fuel, Users, Timer, CreditCard,
    ReceiptText, ChevronLeft, CheckCircle2, PackageCheck,
    Flag, Zap, Gauge, Settings, MessageSquare, Phone,
    ShieldAlert, Info, ExternalLink, CalendarDays,
    ShieldCheck
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { trpc } from "@/trpc/client"
import { format, intervalToDuration, isAfter, isBefore } from "date-fns"
import { useEffect, useState } from "react"
import UserHandoverModal from "@/components/dashboard/user/modal/userHandoverModal"

export default function BookingDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string

    // Change this to your actual primary color name or hex
    const primaryColor = "teal.500"

    // 1. Manage the state here
    const [isModalOpen, setIsModalOpen] = useState(false)


    const { data: booking, isLoading } = trpc.booking.getBookingDetails.useQuery({ id })
    const [timeLeft, setTimeLeft] = useState<any>(null)
    const [percentDone, setPercentDone] = useState(0)

    useEffect(() => {
        if (!booking) return
        const timer = setInterval(() => {
            const now = new Date()
            const start = new Date(booking.startDate)
            const end = new Date(booking.endDate)

            if (isAfter(now, end)) {
                setTimeLeft("Completed")
                setPercentDone(100)
                clearInterval(timer)
            } else {
                setTimeLeft(intervalToDuration({ start: now, end }))
                const total = end.getTime() - start.getTime()
                const current = now.getTime() - start.getTime()
                setPercentDone(Math.min(100, Math.max(0, (current / total) * 100)))
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [booking])

    if (isLoading) return <Center h="80vh"><Spinner size="xl" /></Center>
    if (!booking) return <Center h="80vh">Booking details unavailable.</Center>

    // Step Definitions
    const MASTER_STEPS = [
        { id: "Booking Created", title: "Reservation Confirmed", icon: <CheckCircle2 size={16} /> },
        { id: "Payment Successful", title: "Payment Verified", icon: <CreditCard size={16} /> },
        {
            id: "Identity Verified",
            title: "Identity & License Check",
            icon: <ShieldCheck size={16} />,
            // DYNAMIC CHECK: Look at the User model fields
            isAutoDone: (booking: any) => booking.user.isIdentityVerified
        },
        { id: "Vehicle Handover", title: "Vehicle Handover", icon: <MapPin size={16} /> },
        { id: "Return Inspection", title: "Return Inspection", icon: <Flag size={16} /> },
        { id: "Settled", title: "Final Settlement", icon: <PackageCheck size={16} /> },
    ];

    // Check Vehicle Handover Status
    const isHandedOver = !!booking.journey?.find((p: any) => p.title == "Vehicle Handover");

    return (
        <Box maxW="1400px" mx="auto" p={{ base: 4, md: 12 }} bg="white">

            {/* Receive Vehicle  */}

            {
                !isHandedOver ? booking.pickupPhotos && booking.pickupPhotos.length > 0 ? (
                    <Box mb={8} p={4} border="1px solid" borderColor="green.300" borderRadius="xl" bg="green.50">
                        <HStack>
                            <ShieldCheck size={20} color="green" />
                            <Text fontWeight="bold" color="green.800">
                                Pickup photos have been uploaded.
                            </Text>
                        </HStack>
                    </Box>
                ) : <Box mb={8} p={4} >
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        colorPalette="teal"
                        fontWeight="black"
                        className="w-full"
                    >
                        Pick Up Vehicle
                    </Button>

                    <UserHandoverModal
                        booking={booking}
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        mode="pickup"
                    />
                </Box>
                    : ''
            }

            {/* Return Options */}
            {
                isHandedOver && <Box mb={8} p={4} >
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        colorPalette="red"
                        fontWeight="black"
                        className="w-full"
                    >
                        Return Vehicle
                    </Button>
                    <UserHandoverModal
                        booking={booking}
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        mode="return"
                    />

                </Box>
            }



            {/* Progress Bar */}
            <Box mb="16" position="relative">
                <HStack justify="space-between" mb={3}>
                    <HStack>
                        <PulseCircle color={primaryColor} />
                        <Text fontSize="10px" fontWeight="black" letterSpacing="0.4em">LIVE RENTAL STATUS</Text>
                    </HStack>
                    <Text fontSize="10px" fontWeight="black" color={primaryColor}>{Math.round(percentDone)}% JOURNEY COMPLETE</Text>
                </HStack>
                <Box h="2px" w="full" bg="gray.100">
                    <Box h="full" w={`${percentDone}%`} bg={primaryColor} transition="width 1.5s cubic-bezier(0.65, 0, 0.35, 1)" />
                </Box>
            </Box>



            {/* 2. DUAL-GRID LAYOUT */}
            <Grid templateColumns={{ base: "1fr", xl: "1.4fr 0.6fr" }} gap={20}>

                {/* LEFT SIDE: THE EXPERIENCE */}
                <Stack gap={16}>

                    {/* Hero Section */}
                    <Flex justify="space-between" align="center">
                        <HStack gap={8}>
                            <Circle
                                size="14" border="1px solid" borderColor="gray.100"
                                cursor="pointer" onClick={() => router.back()}
                                _hover={{ bg: "gray.50" }}
                            >
                                <ChevronLeft size={28} />
                            </Circle>
                            <VStack align="flex-start" gap={0}>
                                <Heading size="2xl" fontWeight="900" letterSpacing="-0.05em">
                                    {booking.car.name}
                                </Heading>
                                <Text fontWeight="bold" color="gray.400" fontSize="sm">
                                    {booking.car.brand} • Trip #{booking.id.toUpperCase().slice(-6)}
                                </Text>
                            </VStack>
                        </HStack>
                        <Badge variant="outline" borderColor={primaryColor} color={primaryColor} px={6} py={2} borderRadius="none" fontWeight="black">
                            {booking.status}
                        </Badge>
                    </Flex>

                    {/* Industrial Timer */}
                    <Box border="4px solid" borderColor="black" p={12} position="relative">
                        <Box position="absolute" top="-15px" left="30px" bg="white" px={4}>
                            <Text fontSize="10px" fontWeight="black" letterSpacing="0.2em">COUNTDOWN TO RETURN</Text>
                        </Box>
                        <HStack gap={{ base: 6, md: 14 }} justify="center">
                            <TimerUnit label="DAYS" value={timeLeft?.days} color="black" />
                            <TimerUnit label="HOURS" value={timeLeft?.hours} color="black" />
                            <TimerUnit label="MINS" value={timeLeft?.minutes} color="black" />
                            <TimerUnit label="SECS" value={timeLeft?.seconds} color={primaryColor} />
                        </HStack>
                    </Box>

                    {/* Timeline & Map Combo */}

                    <Box p={10} border="1px solid" borderColor="gray.100" borderRadius="3xl" bg="white">
                        <Heading size="sm" fontWeight="900" mb={12} letterSpacing="widest">
                            TRIP JOURNEY
                        </Heading>

                        <VStack align="stretch" gap={0}>
                            {MASTER_STEPS.map((step, index) => {
                                // Find if this specific step exists in the DB 'journey' array
                                const dbPhase = booking.journey?.find((p: any) => p.title === step.id);

                                const isDone = !!dbPhase;
                                const isLast = index === MASTER_STEPS.length - 1;

                                // Dynamic Description: Show DB time if done, otherwise generic desc
                                const displayDesc = dbPhase
                                    ? `Completed on ${format(new Date(dbPhase.createdAt), "MMM dd, hh:mm a")}`
                                    : `Awaiting ${step.title.toLowerCase()}`;

                                return (
                                    <TimelineStep
                                        key={step.id}
                                        icon={step.icon}
                                        title={step.title}
                                        desc={displayDesc}
                                        isDone={isDone}
                                        isLast={isLast}
                                        primaryColor={primaryColor}
                                    />
                                );
                            })}
                        </VStack>
                    </Box>




                    {/* Safety Checklist (NEW) */}
                    <Box p={10} border="1px solid" borderColor="gray.100" borderRadius="3xl">
                        <Heading size="sm" fontWeight="900" mb={8}>RETURN CHECKLIST</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                            <SafetyCheck label="Full Tank of Fuel" />
                            <SafetyCheck label="No New Exterior Damage" />
                            <SafetyCheck label="Personal Belongings Removed" />
                            <SafetyCheck label="Keys in Glovebox / Handover" />
                        </SimpleGrid>
                    </Box>
                </Stack>

                {/* RIGHT SIDE: THE MANAGEMENT */}
                <Stack gap={10}>
                    {/* Floating Car Card */}
                    <Box p={2} border="1px solid" borderColor="gray.100" borderRadius="3xl">
                        <Image src={booking.car.image} alt="car" borderRadius="2xl" />
                    </Box>

                    {/* Protection Plan Details */}
                    <Box bg="black" color="white" p={10} borderRadius="3xl">
                        <HStack justify="space-between" mb={8}>
                            <VStack align="flex-start" gap={0}>
                                <Text fontSize="xs" color="gray.500" fontWeight="black">COVERAGE</Text>
                                <Heading size="md">{booking.protectionPlan} PLAN</Heading>
                            </VStack>
                            <ShieldAlert size={32} color="white" />
                        </HStack>
                        <VStack align="stretch" gap={3} fontSize="sm">
                            <HStack><CheckCircle2 size={14} color="gray" /> <Text>Collision Damage Waiver</Text></HStack>
                            <HStack><CheckCircle2 size={14} color="gray" /> <Text>24/7 Roadside Assistance</Text></HStack>
                            <HStack><Info size={14} color="gray" /> <Text color="gray.400">View Policy Details</Text></HStack>
                        </VStack>
                    </Box>

                    {/* Financial Summary */}
                    <Stack p={10} border="1px solid" borderColor="gray.100" borderRadius="3xl" gap={6}>
                        <VStack align="stretch" gap={4}>
                            <Flex justify="space-between" fontSize="sm">
                                <Text color="gray.500">Rental Subtotal</Text>
                                <Text fontWeight="bold">${booking.totalPrice - booking.serviceFee}.00</Text>
                            </Flex>
                            <Flex justify="space-between" fontSize="sm">
                                <Text color="gray.500">Service Fee</Text>
                                <Text fontWeight="bold">${booking.serviceFee}.00</Text>
                            </Flex>

                            <Flex justify="space-between" align="center">
                                <Text fontWeight="black">TOTAL PAID</Text>
                                <Text fontSize="4xl" fontWeight="900" letterSpacing="-0.05em">${booking.totalPrice}</Text>
                            </Flex>
                        </VStack>
                        <Button colorScheme="teal" h="16" fontSize="sm" letterSpacing="0.2em" fontWeight="black" borderRadius="none">
                            DOWNLOAD RECEIPT
                        </Button>
                    </Stack>

                    {/* Sticky Mobile Actions */}
                    <HStack gap={4}>
                        <Button flex={1} variant="outline" h="14" borderRadius="none" borderColor="black" fontWeight="black" fontSize="xs">EXTEND TRIP</Button>
                        <Button flex={1} bg="black" color="white" h="14" borderRadius="none" fontWeight="black" fontSize="xs" _hover={{ bg: primaryColor }}>FINISH TRIP</Button>
                    </HStack>
                </Stack>
            </Grid>
        </Box>
    )
}

// --- Specialized UI Components ---

function TimerUnit({ label, value, color }: any) {
    return (
        <VStack gap={0}>
            <Text fontSize={{ base: "4xl", md: "7xl" }} fontWeight="900" letterSpacing="-0.08em" lineHeight="1" color={color}>
                {String(value || 0).padStart(2, '0')}
            </Text>
            <Text fontSize="10px" fontWeight="black" color="gray.400">{label}</Text>
        </VStack>
    )
}

function TimelineStep({ icon, title, desc, isDone, isLast, primaryColor }: any) {
    return (
        <HStack align="flex-start" gap={10} h={isLast ? "auto" : "90px"} position="relative">
            {/* The Connecting Line */}
            {!isLast && (
                <Box
                    position="absolute"
                    left="19px"
                    top="40px"
                    w="2px"
                    h="50px"
                    bg={isDone ? primaryColor : "gray.100"}
                    zIndex={1}
                />
            )}

            {/* The Icon Node */}
            <Circle
                size="10"
                border="2px solid"
                borderColor={isDone ? primaryColor : "gray.100"}
                bg={isDone ? primaryColor : "white"}
                color={isDone ? "white" : "gray.300"}
                zIndex={2}
                transition="all 0.5s ease"
            >
                {icon}
            </Circle>

            {/* The Content */}
            <VStack align="flex-start" gap={0} pt={1}>
                <HStack>
                    <Text
                        fontWeight="black"
                        fontSize="sm"
                        letterSpacing="tight"
                        color={isDone ? "black" : "gray.400"}
                    >
                        {title}
                    </Text>
                    {isDone && <Icon as={CheckCircle2} color={primaryColor} w={3} h={3} />}
                </HStack>
                <Text fontSize="xs" color="gray.500" fontWeight="bold">
                    {desc}
                </Text>
            </VStack>
        </HStack>
    )
}

function SafetyCheck({ label }: { label: string }) {
    return (
        <HStack p={4} border="1px solid" borderColor="gray.100" borderRadius="xl" _hover={{ borderColor: "black" }} transition="0.2s">

            <Text fontSize="xs" fontWeight="bold" ml={2}>{label}</Text>
        </HStack>
    )
}

function PulseCircle({ color }: { color: string }) {
    return (
        <Box w="8px" h="8px" bg={color} borderRadius="full" position="relative">
            <Box
                position="absolute" inset="-4px" borderRadius="full" border="1px solid"
                borderColor={color} animation="pulse 2s infinite"
            />
        </Box>
    )
}