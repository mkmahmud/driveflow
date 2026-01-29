"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Heading, Badge, Text, VStack, HStack,
  Container, Input, Flex, SimpleGrid, IconButton, Avatar
} from "@chakra-ui/react";
import {
  Search, Calendar, Car, Clock,
  CheckCircle2, AlertCircle, ChevronRight, X, MapPin
} from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";

// Mock Booking Data
const MOCK_BOOKINGS = [
  { id: "BOK-2021", customer: "Alex Rivera", vehicle: "Tesla Model 3", start: "Jan 30", end: "Feb 02", total: "$420.00", status: "Confirmed", location: "Downtown Hub" },
  { id: "BOK-1942", customer: "Sarah Chen", vehicle: "Porsche 911", start: "Feb 05", end: "Feb 07", total: "$1,150.00", status: "Pending", location: "Airport Terminal" },
  { id: "BOK-1890", customer: "Marcus Vogt", vehicle: "Range Rover", start: "Jan 25", end: "Jan 28", total: "$890.00", status: "Completed", location: "Westside Point" },
  { id: "BOK-1755", customer: "Elena Rossi", vehicle: "Audi RS7", start: "Jan 22", end: "Jan 24", total: "$650.00", status: "Cancelled", location: "Downtown Hub" },
  { id: "BOK-1621", customer: "Jordan Lee", vehicle: "BMW M4", start: "Feb 10", end: "Feb 12", total: "$540.00", status: "Confirmed", location: "North Station" },
  { id: "BOK-1620", customer: "Jordan Lee", vehicle: "BMW M4", start: "Feb 10", end: "Feb 12", total: "$540.00", status: "Confirmed", location: "North Station" },
];

export default function AdminBookingsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return MOCK_BOOKINGS.filter((booking) =>
      booking.id.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.toLowerCase().includes(search.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Container maxW="1200px" py={10}>
      <Flex justify="space-between" align="flex-end" mb={10}>
        <VStack align="start" gap={1}>
          <Text fontSize="xs" fontWeight="black" color="blue.600" letterSpacing="widest">FLEET OPERATIONS</Text>
          <Heading size="2xl" fontWeight="900" letterSpacing="tight">Reservations</Heading>
        </VStack>

        <HStack gap={3}>
          <Box border="1px solid" borderColor="gray.200" rounded="xl" px={4} py={2} bg="white" minW="300px">
            <HStack gap={2}>
              <Search size={16} className="text-gray-400" />
              <Input
                variant="flushed"
                placeholder="Search ID, Customer, or Car..."
                fontSize="sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && <IconButton aria-label="Clear" size="xs" variant="ghost" onClick={() => setSearch("")}><X size={14} /></IconButton>}
            </HStack>
          </Box>
        </HStack>
      </Flex>

      {/* Booking Insights */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <BookingStat label="Active Trips" value="14 Vehicles" icon={<Car />} color="blue" />
        <BookingStat label="Pending Approval" value="08 Requests" icon={<Clock />} color="orange" />
        <BookingStat label="Scheduled Today" value="05 Check-ins" icon={<Calendar />} color="purple" />
      </SimpleGrid>

      {/* The Reusable DataTable */}
      <DataTable
        data={filteredBookings}
        pageSize={5} // Showing pagination works
        onRowClick={(booking) => router.push(`/dashboard/admin/bookings/${booking.id}`)}
        columns={[
          {
            header: "RESERVATION",
            accessor: "id",
            sortable: true,
            render: (val, booking) => (
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="sm">{booking.id}</Text>
                <HStack gap={1} color="gray.400">
                  <MapPin size={10} />
                  <Text fontSize="2xs">{booking.location}</Text>
                </HStack>
              </VStack>
            )
          },
          {
            header: "CUSTOMER",
            accessor: "customer",
            render: (val) => (
              <HStack gap={3}>
                <Avatar.Root size="xs">
                  <Avatar.Fallback name={val} />
                </Avatar.Root>
                <Text fontWeight="bold" fontSize="sm">{val}</Text>
              </HStack>
            )
          },
          {
            header: "VEHICLE",
            accessor: "vehicle",
            render: (val) => (
              <HStack gap={2}>
                <Car size={14} className="text-gray-400" />
                <Text fontWeight="medium" fontSize="sm">{val}</Text>
              </HStack>
            )
          },
          {
            header: "DURATION",
            accessor: "start",
            render: (val, booking) => (
              <Text fontSize="xs" fontWeight="bold">
                {booking.start} — {booking.end}
              </Text>
            )
          },
          {
            header: "STATUS",
            accessor: "status",
            render: (val) => {
              const colorMap: any = {
                Confirmed: "emerald",
                Pending: "orange",
                Completed: "blue",
                Cancelled: "red"
              };
              return (
                <Badge variant="surface" colorPalette={colorMap[val]} rounded="full" textTransform="capitalize" px={3}>
                  {val}
                </Badge>
              );
            }
          }
        ]}
      />
    </Container>
  );
}

function BookingStat({ label, value, icon, color }: any) {
  return (
    <Box p={6} border="1px solid" borderColor="gray.200" rounded="2xl" bg="white">
      <HStack gap={4}>
        <Box p={3} bg={`${color}.50`} color={`${color}.600`} rounded="xl">{icon}</Box>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">{label}</Text>
          <Text fontSize="xl" fontWeight="900">{value}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}