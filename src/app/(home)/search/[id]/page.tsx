"use client"

import {
  Box, Container, Grid, Stack, Text, Heading, HStack,
  Badge, Image, Separator, Button, Flex, Avatar, SimpleGrid, Skeleton
} from "@chakra-ui/react"
import {
  Star, MapPin, Users, Gauge, Fuel, ShieldCheck,
  Zap, ChevronRight,
} from "lucide-react"
import { useState, useMemo } from "react"
import { Checkbox } from "@/components/ui/checkbox"

// Date Picker Imports
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { differenceInDays } from "date-fns"
import { useParams, useRouter } from 'next/navigation'
import { trpc } from "@/trpc/client"

export default function CarDetailsPage() {
  const params = useParams()
  const carId = params.id as string
  const router = useRouter();

  // --- BACKEND DATA ---
  const { data: user } = trpc.auth.me.useQuery() // Get current user for logging
  const { data: car, isLoading } = trpc.car.getCarDetails.useQuery({
    carId,
  });

  // --- STATE ---
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + 3 * 86400000))
  const [includeTank, setIncludeTank] = useState(false)
  const [includeChildSeat, setIncludeChildSeat] = useState(false)

  // --- CALCULATIONS ---
  const stats = useMemo(() => {
    if (!car) return { days: 1, subtotal: 0, extras: 0, total: 0, serviceFee: 25 }

    const days = (startDate && endDate) ? Math.max(1, differenceInDays(endDate, startDate)) : 1
    const extras = (includeTank ? 50 : 0) + (includeChildSeat ? 30 : 0)
    const serviceFee = 25
    const subtotal = days * car.pricePerDay

    return {
      days,
      subtotal,
      extras,
      serviceFee,
      total: subtotal + extras + serviceFee
    }
  }, [startDate, endDate, includeTank, includeChildSeat, car])

  // --- HANDLE BOOKING LOG ---
  const handleBookNow = () => {
    if (!car) return;

    const bookingData = {
      user: { id: user?.id, email: user?.email, name: user?.name },
      car: {
        id: car.id,
        name: car.name,
        pricePerDay: car.pricePerDay,
        image: car.image
      },
      reservation: {
        pickupDate: startDate,
        returnDate: endDate,
        duration: `${stats.days} days`,
      },
      addons: {
        fullTank: includeTank,
        childSeat: includeChildSeat
      },
      financials: {
        subtotal: stats.subtotal,
        extras: stats.extras,
        serviceFee: stats.serviceFee,
        totalAmount: stats.total
      }
    }

    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    router.push('/payment');

  }

  if (isLoading) return <LoadingSkeleton />
  if (!car) return <Box p="20" textAlign="center">Car not found.</Box>

  return (
    <Box bg="gray.50/50" minH="100vh" py="10">
      <Container maxW="breakpoint-xl">
        {/* 1. BREADCRUMBS & HEADER */}
        <Stack gap="2" mb="8">
          <HStack fontSize="xs" color="gray.400" fontWeight="bold" letterSpacing="widest">
            <Text>SEARCH</Text> <ChevronRight size={10} />
            <Text textTransform="uppercase">{car.type}</Text> <ChevronRight size={10} />
            <Text color="teal.600" textTransform="uppercase">{car.name}</Text>
          </HStack>
          <Heading size="4xl" fontWeight="900">{car.name}</Heading>
          <HStack gap="4" color="gray.500" fontSize="sm">
            <HStack gap="1"><MapPin size={16} className="text-teal-600" /><Text>{car.location}</Text></HStack>
            <HStack gap="1">
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <Text fontWeight="bold" color="gray.900">4.9</Text>
              <Text>(Verified Listing)</Text>
            </HStack>
          </HStack>
        </Stack>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap="10">

          {/* LEFT COLUMN */}
          <Stack gap="10">
            <Box rounded="3xl" overflow="hidden" h="500px">
              <Image src={car.image} alt={car.name} w="full" h="full" objectFit="cover" />
            </Box>

            <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
              <FeatureCard icon={Users} title={`${car.seats} Seats`} />
              <FeatureCard icon={Gauge} title={car.transmission} />
              <FeatureCard icon={Fuel} title={car.fuelType} />
              <FeatureCard icon={Zap} title={`${car.horsepower} HP`} />
            </SimpleGrid>

            <Stack gap="4">
              <Heading size="lg">Description</Heading>
              <Text color="gray.600" lineHeight="tall" fontSize="lg">
                {car.description || `Experience the ${car.name}. This ${car.type} vehicle in ${car.location} offers a perfect blend of performance and comfort.`}
              </Text>
            </Stack>

            <Separator />

            {/* Host Information */}
            <Flex p="6" rounded="3xl" bg="white" border="1px solid" borderColor="gray.100" justify="space-between" align="center">
              <HStack gap="4">
                <Avatar.Root size="lg"><Avatar.Fallback bg="teal.600" color="white" name="Host" /></Avatar.Root>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">Vehicle Host</Text>
                  <Text fontSize="sm" color="gray.500">Professional Host • Identity Verified</Text>
                </Box>
              </HStack>
              <Button variant="surface" rounded="xl">Contact Host</Button>
            </Flex>
          </Stack>

          {/* RIGHT COLUMN: BOOKING CARD */}
          <Stack gap="6" position="sticky" top="6">
            <Box bg="white" p="8" rounded="3xl" border="1px solid" borderColor="teal.50">
              <Flex justify="space-between" align="center" mb="8">
                <HStack align="baseline" gap="1">
                  <Text fontSize="3xl" fontWeight="900" color="teal.600">${car.pricePerDay}</Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="bold">/ day</Text>
                </HStack>
                <Badge colorPalette="teal">Available</Badge>
              </Flex>

              {/* DATE PICKERS */}
              <Stack gap="4" mb="8">
                <Text fontSize="xs" fontWeight="800" color="gray.400" letterSpacing="tighter">SELECT DATES</Text>
                <Grid templateColumns="1fr 1fr" gap="2" position="relative">
                  <Box className="custom-datepicker-container">
                    <Text fontSize="10px" fontWeight="bold" color="teal.600" mb="1" ml="2">PICKUP</Text>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      className="date-input-styled"
                    />
                  </Box>
                  <Box className="custom-datepicker-container">
                    <Text fontSize="10px" fontWeight="bold" color="teal.600" mb="1" ml="2">RETURN</Text>
                    <DatePicker
                      selected={endDate}
                      onChange={(date: any) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                      className="date-input-styled"
                    />
                  </Box>
                </Grid>
              </Stack>

              {/* EXTRAS */}
              <Stack gap="4" mb="8">
                <Text fontSize="xs" fontWeight="800" color="gray.400" letterSpacing="tighter">EXTRAS</Text>
                <Checkbox colorPalette="teal" checked={includeTank} onCheckedChange={(e) => setIncludeTank(!!e.checked)}>
                  <Flex justify="space-between" w="full" ml="2"><Text fontSize="sm">Full Tank</Text><Text fontSize="sm" fontWeight="bold">+$50</Text></Flex>
                </Checkbox>
                <Checkbox colorPalette="teal" checked={includeChildSeat} onCheckedChange={(e) => setIncludeChildSeat(!!e.checked)}>
                  <Flex justify="space-between" w="full" ml="2"><Text fontSize="sm">Child Seat</Text><Text fontSize="sm" fontWeight="bold">+$30</Text></Flex>
                </Checkbox>
              </Stack>

              <Separator mb="6" />

              {/* PRICE BREAKDOWN */}
              <Stack gap="3" mb="8">
                <Flex justify="space-between" fontSize="sm">
                  <Text color="gray.500">${car.pricePerDay} x {stats.days} days</Text>
                  <Text fontWeight="bold">${stats.subtotal}</Text>
                </Flex>
                {stats.extras > 0 && (
                  <Flex justify="space-between" fontSize="sm">
                    <Text color="gray.500">Extras</Text>
                    <Text fontWeight="bold">+${stats.extras}</Text>
                  </Flex>
                )}
                <Flex justify="space-between" fontSize="sm">
                  <Text color="gray.500">Service Fee</Text>
                  <Text fontWeight="bold">${stats.serviceFee}</Text>
                </Flex>
                <Flex justify="space-between" align="center" pt="4" borderTop="1px dashed" borderColor="gray.200">
                  <Text fontSize="lg" fontWeight="900">Total</Text>
                  <Text fontSize="2xl" fontWeight="900" color="teal.600">${stats.total}</Text>
                </Flex>
              </Stack>

              <Button
                onClick={handleBookNow}
                w="full" size="xl" colorPalette="teal" rounded="2xl" fontWeight="black" py="8"
              >
                Book Now
              </Button>
            </Box>

            <Box bg="teal.50" p="4" rounded="2xl" border="1px solid" borderColor="teal.100">
              <HStack gap="3">
                <ShieldCheck className="text-teal-600" size={20} />
                <Box>
                  <Text fontSize="sm" fontWeight="bold">Verified Secure</Text>
                  <Text fontSize="xs">Secure payment & insurance included.</Text>
                </Box>
              </HStack>
            </Box>
          </Stack>
        </Grid>
      </Container>

      <style jsx global>{`
          .date-input-styled {
              width: 100%;
              padding: 10px 12px;
              border: 1px solid #E2E8F0;
              border-radius: 12px;
              font-size: 14px;
              font-weight: 600;
              outline: none;
              cursor: pointer;
              transition: all 0.2s;
          }
          .date-input-styled:hover { border-color: #319795; }
          .date-input-styled:focus { border-color: #319795; box-shadow: 0 0 0 1px #319795; }
          .react-datepicker { border-radius: 16px !important; border: none !important; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1) !important; font-family: inherit !important; padding: 10px; }
          .react-datepicker__header { background: white !important; border-bottom: none !important; }
          .react-datepicker__day--selected { background-color: #319795 !important; border-radius: 8px !important; }
          .react-datepicker__day--in-range { background-color: #E6FFFA !important; color: #2C7A7B !important; }
      `}</style>
    </Box>
  )
}

function FeatureCard({ icon: Icon, title }: { icon: any, title: string }) {
  return (
    <Stack align="center" p="5" bg="white" rounded="2xl" border="1px solid" borderColor="gray.100" _hover={{ bg: "teal.50", borderColor: "teal.200" }} cursor="default" transition="all 0.2s">
      <Box p="3" bg="teal.50" rounded="xl" color="teal.600"><Icon size={24} /></Box>
      <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" textAlign="center">{title}</Text>
    </Stack>
  )
}

function LoadingSkeleton() {
  return (
    <Container maxW="breakpoint-xl" py="10">
      <Stack gap="4" mb="8">
        <Skeleton h="20px" w="200px" />
        <Skeleton h="40px" w="400px" />
      </Stack>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap="10">
        <Stack gap="8">
          <Skeleton h="500px" rounded="3xl" />
          <SimpleGrid columns={4} gap="4">
            <Skeleton h="100px" rounded="2xl" />
            <Skeleton h="100px" rounded="2xl" />
            <Skeleton h="100px" rounded="2xl" />
            <Skeleton h="100px" rounded="2xl" />
          </SimpleGrid>
        </Stack>
        <Skeleton h="600px" rounded="3xl" />
      </Grid>
    </Container>
  )
}