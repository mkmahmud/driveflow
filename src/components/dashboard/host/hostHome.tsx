"use client";

import { Heading, Text, VStack, HStack, Box, SimpleGrid, Badge, Button, Flex, Separator, Center, Grid } from "@chakra-ui/react";
import { 
  DollarSign, Car, Calendar, MessageSquare, 
  TrendingUp, Clock, MapPin, ChevronRight 
} from "lucide-react";

export default function HostHome() {
  return (
    <Box maxW="1200px" mx="auto" py={8}>
      {/* 1. Welcoming Header */}
      <Flex justify="space-between" align="center" mb={10}>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" fontWeight="black" color="blue.500" letterSpacing="0.2em">HOST CONSOLE</Text>
          <Heading size="2xl" fontWeight="900" letterSpacing="-0.02em">Welcome back, Marcus</Heading>
        </VStack>
        <Button bg="black" color="white" rounded="xl" px={6} h="45px" fontSize="sm">
          + List New Vehicle
        </Button>
      </Flex>

      {/* 2. Key Performance Row (Flat & Bordered) */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5} mb={10}>
        <MetricCard label="Monthly Earnings" value="$4,250.00" trend="+12.5%" icon={DollarSign} color="emerald.500" />
        <MetricCard label="Active Rentals" value="08" trend="Across 12 cars" icon={Car} color="blue.500" />
        <MetricCard label="Upcoming Payout" value="Feb 01" trend="Processing" icon={Calendar} color="purple.500" />
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "1.8fr 1.2fr" }} gap={8}>
        
        {/* 3. Operational: Upcoming Handovers */}
        <Box border="1px solid" borderColor="gray.200" rounded="2xl" overflow="hidden">
          <Box p={5} borderBottom="1px solid" borderColor="gray.100" bg="gray.50/50">
            <HStack justify="space-between">
              <Heading size="sm" fontWeight="900">Today's Schedule</Heading>
              <Badge colorPalette="orange" variant="surface">3 Actions</Badge>
            </HStack>
          </Box>
          <VStack align="stretch" gap={0}>
            <ScheduleRow 
              time="10:00 AM" 
              action="Pickup" 
              car="Porsche 911 GT3" 
              guest="Sarah C." 
              location="Terminal 1" 
            />
            <ScheduleRow 
              time="02:30 PM" 
              action="Return" 
              car="Tesla Model 3" 
              guest="John D." 
              location="Westside Hub" 
              isLast 
            />
          </VStack>
        </Box>

        {/* 4. Fleet Health Sidebar */}
        <VStack gap={6} align="stretch">
          <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl">
            <Heading size="sm" fontWeight="900" mb={5}>Fleet Utilization</Heading>
            <VStack gap={4} align="stretch">
              <ProgressItem label="Booked (8/12)" value={66} color="blue.500" />
              <ProgressItem label="Available" value={25} color="emerald.500" />
              <ProgressItem label="Maintenance" value={9} color="orange.500" />
            </VStack>
          </Box>

          {/* Quick Chat / Support */}
          <Box bg="blue.900" p={6} rounded="2xl" color="white">
            <HStack gap={4} mb={4}>
              <Center bg="white/10" p={2} rounded="lg"><MessageSquare size={20}/></Center>
              <Text fontWeight="bold" fontSize="sm">Guest Support</Text>
            </HStack>
            <Text fontSize="xs" opacity={0.7} mb={4}>You have 2 unread messages from active guests.</Text>
            <Button w="full" bg="white" color="blue.900" size="sm" rounded="lg" fontWeight="900">Open Inbox</Button>
          </Box>
        </VStack>

      </Grid>
    </Box>
  );
}

// --- Host UI Sub-Components ---

function MetricCard({ label, value, trend, icon: Icon, color }: any) {
  return (
    <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl" bg="white">
      <HStack justify="space-between" mb={4}>
        <Center boxSize="40px" border="1px solid" borderColor="gray.100" rounded="xl">
          <Icon size={18} color={color} />
        </Center>
        <Badge variant="subtle" colorPalette="emerald" fontSize="2xs">{trend}</Badge>
      </HStack>
      <Text fontSize="2xs" fontWeight="black" color="gray.400" textTransform="uppercase" letterSpacing="widest">{label}</Text>
      <Heading size="xl" fontWeight="900" mt={1}>{value}</Heading>
    </Box>
  );
}

function ScheduleRow({ time, action, car, guest, location, isLast }: any) {
  return (
    <Box p={5} borderBottom={isLast ? "none" : "1px solid"} borderColor="gray.100" _hover={{ bg: "gray.50" }} transition="0.2s">
      <HStack justify="space-between">
        <HStack gap={5}>
          <VStack align="start" gap={0} minW="70px">
            <Text fontSize="xs" fontWeight="black">{time}</Text>
            <Badge size="xs" colorPalette={action === "Pickup" ? "blue" : "emerald"} variant="surface">{action}</Badge>
          </VStack>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="900">{car}</Text>
            <Text fontSize="xs" color="gray.500">Guest: {guest} • {location}</Text>
          </VStack>
        </HStack>
        <ChevronRight size={16} className="text-gray-300" />
      </HStack>
    </Box>
  );
}

function ProgressItem({ label, value, color }: any) {
  return (
    <VStack align="stretch" gap={1.5}>
      <HStack justify="space-between">
        <Text fontSize="xs" fontWeight="bold" color="gray.600">{label}</Text>
        <Text fontSize="xs" fontWeight="black">{value}%</Text>
      </HStack>
      <Box h="6px" bg="gray.100" rounded="full">
        <Box h="full" w={`${value}%`} bg={color} rounded="full" />
      </Box>
    </VStack>
  );
}