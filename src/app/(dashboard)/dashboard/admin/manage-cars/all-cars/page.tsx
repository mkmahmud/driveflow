"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Heading, Badge, Text, VStack, HStack,
  Container, Input, Flex, SimpleGrid, IconButton, Image
} from "@chakra-ui/react";
import {
  Search, Car, Plus, Fuel,
  Gauge, Filter, X, ChevronRight
} from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";

// Mock Fleet Data
const MOCK_CARS = [
  { id: "CAR-001", model: "Tesla Model 3", plate: "EV-9021", host: "Sarah Jenkins", category: "Electric", status: "Available", price: "$120/day", health: "98%" },
  { id: "CAR-002", model: "Porsche 911", plate: "PR-2026", host: "Marcus Vogt", category: "Luxury", status: "Booked", price: "$450/day", health: "92%" },
  { id: "CAR-003", model: "Range Rover", plate: "RR-5501", host: "Sarah Jenkins", category: "SUV", status: "Maintenance", price: "$280/day", health: "75%" },
  { id: "CAR-004", model: "Audi RS7", plate: "RS-7788", host: "Elena Rossi", category: "Sport", status: "Available", price: "$320/day", health: "100%" },
];

export default function AdminCarsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter((car) =>
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.plate.toLowerCase().includes(search.toLowerCase()) ||
      car.host.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Container maxW="1200px" py={10}>
      <Flex justify="space-between" align="flex-end" mb={10}>
        <VStack align="start" gap={1}>
          <Text fontSize="xs" fontWeight="black" color="purple.600" letterSpacing="widest">ASSET MANAGEMENT</Text>
          <Heading size="2xl" fontWeight="900" letterSpacing="tight">Fleet Directory</Heading>
        </VStack>

        <HStack gap={3}>
          <Box border="1px solid" borderColor="gray.200" rounded="xl" px={4} py={2} bg="white" minW="300px">
            <HStack gap={2}>
              <Search size={16} className="text-gray-400" />
              <Input
                variant="flushed"
                placeholder="Search Plate, Model, or Host..."
                fontSize="sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </HStack>
          </Box>
          <IconButton bg="black" color="white" rounded="xl" aria-label="Add Car"><Plus size={20} /></IconButton>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6} mb={8}>
        <FleetStat label="Total Fleet" value="42 Units" color="gray" />
        <FleetStat label="In Service" value="38 Units" color="emerald" />
        <FleetStat label="On Hold" value="04 Units" color="orange" />
        <FleetStat label="Revenue/Day" value="$4,820" color="blue" />
      </SimpleGrid>

      <DataTable
        data={filteredCars}
        onRowClick={(car) => router.push(`/dashboard/admin/manage-cars/all-cars/${car.id}`)}
        columns={[
          {
            header: "VEHICLE / PLATE",
            accessor: "model",
            render: (val, car) => (
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="sm">{car.model}</Text>
                <Text fontSize="2xs" color="gray.400" fontFamily="mono" fontWeight="bold">{car.plate}</Text>
              </VStack>
            )
          },
          { header: "HOST", accessor: "host", sortable: true },
          { header: "DAILY RATE", accessor: "price", sortable: true },
          {
            header: "HEALTH",
            accessor: "health",
            render: (val) => (
              <HStack gap={2}>
                <Box w="40px" h="4px" bg="gray.100" rounded="full" overflow="hidden">
                  <Box w={val} h="full" bg={parseInt(val) > 80 ? "emerald.500" : "orange.500"} />
                </Box>
                <Text fontSize="xs" fontWeight="black">{val}</Text>
              </HStack>
            )
          },
          {
            header: "STATUS",
            accessor: "status",
            render: (val) => (
              <Badge variant="surface" colorPalette={val === "Available" ? "emerald" : val === "Booked" ? "blue" : "orange"} rounded="full">
                {val}
              </Badge>
            )
          }
        ]}
      />
    </Container>
  );
}

function FleetStat({ label, value, color }: any) {
  return (
    <Box p={5} border="1px solid" borderColor="gray.200" rounded="2xl" bg="white">
      <Text fontSize="2xs" fontWeight="black" color="gray.400" textTransform="uppercase" mb={1}>{label}</Text>
      <Text fontSize="xl" fontWeight="900" color={`${color}.600`}>{value}</Text>
    </Box>
  );
}