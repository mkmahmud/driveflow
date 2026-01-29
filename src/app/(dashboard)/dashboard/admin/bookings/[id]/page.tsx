"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box, Container, Flex, VStack, HStack, Heading, Text,
  Button, Badge, Separator, SimpleGrid, IconButton, Avatar, Center, Grid, GridItem
} from "@chakra-ui/react";
import { 
  ArrowLeft, Car, MapPin, Calendar, 
  ShieldCheck, Phone, Mail, User,
  Star, Fuel, Gauge, ShieldAlert, MessageSquare
} from "lucide-react";

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <Container maxW="1200px" py={12}>
      {/* Header Actions */}
      <Flex justify="space-between" align="center" mb={10}>
        <VStack align="start" gap={0}>
          <Button onClick={() => router.back()} p={0} mb={2} color="gray.500"  >
            <ArrowLeft size={16} style={{ marginRight: "8px" }} /> Back to Fleet
          </Button>
          <HStack gap={3}>
            <Heading size="xl" fontWeight="900">Booking {id}</Heading>
            <Badge variant="surface" colorPalette="emerald" rounded="full">Live Trip</Badge>
          </HStack>
        </VStack>
        
        <HStack gap={3}>
          <IconButton aria-label="Chat" variant="outline" rounded="xl"><MessageSquare size={18}/></IconButton>
          <Button variant="solid" bg="black" color="white" rounded="xl">Issue Refund</Button>
        </HStack>
      </Flex>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={8}>
        
        {/* Left & Middle Column: The Parties & Vehicle */}
        <GridItem colSpan={{ lg: 2 }}>
          <VStack gap={8} align="stretch">
            
            {/* The Stakeholders (Host & Guest) */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <UserCard 
                type="GUEST (RENTER)" 
                name="Alex Rivera" 
                stats="12 Trips • 5.0 ★" 
                img="https://i.pravatar.cc/150?u=alex"
                color="blue"
              />
              <UserCard 
                type="HOST (OWNER)" 
                name="Sarah Jenkins" 
                stats="48 Reviews • Pro Host" 
                img="https://i.pravatar.cc/150?u=sarah"
                color="emerald"
              />
            </SimpleGrid>

            {/* Vehicle Technical Specs */}
            <Box bg="white" border="1px solid" borderColor="gray.200" rounded="3xl" p={8}>
              <HStack justify="space-between" mb={6}>
                <VStack align="start" gap={0}>
                  <Text fontSize="2xs" fontWeight="black" color="gray.400" letterSpacing="widest">VEHICLE DETAILS</Text>
                  <Heading size="lg" fontWeight="900">2024 Tesla Model 3 Long Range</Heading>
                </VStack>
                <Badge variant="outline" colorPalette="blue">Plate: EV-9021</Badge>
              </HStack>

              <SimpleGrid columns={3} gap={4} mb={8}>
                <SpecBox icon={<Fuel size={16}/>} label="Energy" value="88% SOC" />
                <SpecBox icon={<Gauge size={16}/>} label="Odometer" value="12,402 mi" />
                <SpecBox icon={<ShieldAlert size={16}/>} label="Health" value="Perfect" />
              </SimpleGrid>

              <Box bg="gray.50" p={4} rounded="2xl" border="1px solid" borderColor="gray.100">
                <HStack justify="space-between">
                  <HStack>
                    <MapPin size={16} className="text-blue-500" />
                    <Text fontSize="sm" fontWeight="bold">Current GPS Location</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500" fontFamily="mono">40.7128° N, 74.0060° W</Text>
                </HStack>
              </Box>
            </Box>

            {/* Timeline */}
            <Box p={8} bg="white" border="1px solid" borderColor="gray.200" rounded="3xl">
               <Text fontSize="2xs" fontWeight="black" color="gray.400" letterSpacing="widest" mb={8}>RENTAL LOGISTICS</Text>
               <VStack align="stretch" gap={0} position="relative">
                  <Box position="absolute" left="7px" top="10px" bottom="10px" w="2px" bg="gray.100" />
                  <TimelineStep title="Handover" desc="Guest verified ID and took keys" time="Jan 30, 10:05 AM" isDone />
                  <TimelineStep title="In Progress" desc="Vehicle is currently with guest" time="Expected Feb 02" isActive />
               </VStack>
            </Box>
          </VStack>
        </GridItem>

        {/* Right Column: Financials & Admin Log */}
        <GridItem colSpan={1}>
          <VStack gap={6} align="stretch">
            {/* Billing Summary */}
            <Box bg="white" border="1px solid" borderColor="gray.200" rounded="3xl" p={6}>
              <Text fontSize="2xs" fontWeight="black" color="gray.400" letterSpacing="widest" mb={4}>FINANCIAL BREAKDOWN</Text>
              <VStack align="stretch" gap={3}>
                <PriceRow label="Daily Rate ($120 x 3)" value="$360.00" />
                <PriceRow label="Platform Fee (10%)" value="$36.00" />
                <PriceRow label="Host Earnings" value="-$288.00" color="red.500" />
                <Separator my={2} />
                <HStack justify="space-between">
                  <Text fontWeight="black">Admin Net</Text>
                  <Text fontWeight="black" color="emerald.600">+$108.00</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Verification Checklist */}
            <Box bg="gray.900" rounded="3xl" p={6} color="white">
               <Text fontSize="2xs" fontWeight="black" color="white/40" letterSpacing="widest" mb={4}>ADMIN CHECKLIST</Text>
               <VStack align="stretch" gap={4}>
                  <CheckItem label="Driver License Verified" isDone />
                  <CheckItem label="Insurance Policy Active" isDone />
                  <CheckItem label="Security Deposit Held" isDone />
                  <CheckItem label="Vehicle Pre-trip Photos" isDone />
               </VStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}

// --- Internal Components for Cleanliness ---

function UserCard({ type, name, stats, img, color }: any) {
  return (
    <Box bg="white" border="1px solid" borderColor="gray.200" rounded="2xl" p={5}>
      <Text fontSize="2xs" fontWeight="black" color="gray.400" mb={3}>{type}</Text>
      <HStack gap={4}>
        <Avatar.Root size="md">
          <Avatar.Image src={img} />
          <Avatar.Fallback name={name} />
        </Avatar.Root>
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="md">{name}</Text>
          <Text fontSize="xs" color="gray.500">{stats}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

function SpecBox({ icon, label, value }: any) {
  return (
    <VStack align="start" p={4} bg="gray.50" rounded="2xl" gap={1}>
      <Box color="gray.400">{icon}</Box>
      <Text fontSize="2xs" fontWeight="bold" color="gray.500" textTransform="uppercase">{label}</Text>
      <Text fontSize="sm" fontWeight="black">{value}</Text>
    </VStack>
  );
}

function TimelineStep({ title, desc, time, isDone, isActive }: any) {
  return (
    <HStack align="start" gap={6} pb={8} position="relative">
      <Center 
        boxSize="16px" 
        rounded="full" 
        bg={isDone ? "emerald.500" : isActive ? "blue.500" : "gray.200"} 
        zIndex={1}
        mt="4px"
      />
      <VStack align="start" gap={0}>
        <Text fontSize="sm" fontWeight="bold">{title}</Text>
        <Text fontSize="xs" color="gray.500">{desc}</Text>
        <Text fontSize="2xs" fontWeight="black" color="gray.400" mt={1}>{time}</Text>
      </VStack>
    </HStack>
  );
}

function PriceRow({ label, value, color = "gray.700" }: any) {
  return (
    <HStack justify="space-between">
      <Text fontSize="xs" color="gray.500">{label}</Text>
      <Text fontSize="xs" fontWeight="bold" color={color}>{value}</Text>
    </HStack>
  );
}

function CheckItem({ label, isDone }: any) {
  return (
    <HStack gap={3}>
      <Center boxSize="18px" rounded="md" bg={isDone ? "emerald.500" : "white/10"}>
        {isDone && <ShieldCheck size={12} color="white" />}
      </Center>
      <Text fontSize="xs" fontWeight="medium" opacity={isDone ? 1 : 0.5}>{label}</Text>
    </HStack>
  );
}