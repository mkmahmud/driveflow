"use client";

import { Heading, Text, Stack, Grid, Box, HStack, Icon, VStack, Separator, SimpleGrid, Badge, Button, Center } from "@chakra-ui/react";
import { trpc } from "@/trpc/client";
import { 
  Users, Car, DollarSign, 
  ShieldCheck, MapPin, Activity, 
  ArrowUpRight, AlertCircle, FileText
} from "lucide-react";

export default function AdminHome() {
  const { data: users } = trpc.user.getAllUser.useQuery();

  return (
    <Box pb={10}>
      {/* Header Section */}
      <VStack align="start" gap={0} mb={10}>
        <Text fontSize="xs" fontWeight="black" color="teal.600" letterSpacing="widest">ADMINISTRATIVE COMMAND</Text>
        <Heading size="3xl" fontWeight="900" letterSpacing="tight">Dashboard Overview</Heading>
      </VStack>

      <Stack gap="8">
        
        {/* 1. Primary Metrics (Border-Defined) */}
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
          <BorderStat label="Total Users" value={users?.length || 0} icon={Users} color="blue.500" />
          <BorderStat label="Active Trips" value="28" icon={MapPin} color="purple.500" />
          <BorderStat label="Safety Alerts" value="03" icon={AlertCircle} color="red.500" />
          <BorderStat label="MTD Revenue" value="$14,280" icon={DollarSign} color="emerald.500" />
        </SimpleGrid>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          
          {/* 2. Operational Action Center */}
          <Box border="1px solid" borderColor="gray.200" rounded="2xl" overflow="hidden">
            <Box bg="gray.50" px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
              <HStack justify="space-between">
                <HStack gap={2}>
                  <Activity size={16} className="text-teal-600" />
                  <Heading size="sm" fontWeight="900">Pending Actions</Heading>
                </HStack>
                <Badge variant="solid" bg="black" color="white" rounded="md">5 REQUIRED</Badge>
              </HStack>
            </Box>

            <VStack align="stretch" gap={0}>
              <ActionRow 
                icon={<ShieldCheck size={18} />} 
                title="Identity Verification" 
                subtitle="Alex Rivera uploaded a new Driving License"
                time="12m ago"
                isLast={false}
              />
              <ActionRow 
                icon={<FileText size={18} />} 
                title="Insurance Renewal" 
                subtitle="Tesla Model 3 (EV-9021) insurance is expiring"
                time="1h ago"
                isLast={false}
              />
              <ActionRow 
                icon={<AlertCircle size={18} />} 
                title="Damage Claim" 
                subtitle="New claim reported for Booking #BOK-7721"
                time="3h ago"
                isLast={true}
              />
            </VStack>
          </Box>

          {/* 3. Fleet Distribution Sidebar */}
          <Box border="1px solid" borderColor="gray.200" rounded="2xl" p={6}>
            <Heading size="sm" fontWeight="900" mb={6}>Fleet Distribution</Heading>
            <VStack gap={6} align="stretch">
               <DistributionMetric label="In Use" count={22} total={40} color="blue.500" />
               <DistributionMetric label="Available" count={14} total={40} color="emerald.500" />
               <DistributionMetric label="Maintenance" count={4} total={40} color="orange.500" />
               
               <Box pt={4} borderTop="1px solid" borderColor="gray.100">
                 <HStack justify="space-between">
                    <Text fontSize="xs" fontWeight="bold" color="gray.400">Total Assets</Text>
                    <Text fontSize="xs" fontWeight="black">40 Vehicles</Text>
                 </HStack>
               </Box>
            </VStack>
          </Box>

        </Grid>

        {/* 4. Financial Snapshot Section */}
        <Box border="1px solid" borderColor="gray.200" rounded="3xl" p={8}>
          <HStack justify="space-between" mb={8}>
            <VStack align="start" gap={0}>
               <Text fontSize="2xs" fontWeight="black" color="gray.400" letterSpacing="widest">REVENUE FLOW</Text>
               <Heading size="lg" fontWeight="900">Financial Performance</Heading>
            </VStack>
            <Button variant="outline" borderColor="gray.200" size="sm" rounded="xl">Download CSV</Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
             <RevenueInfo label="Gross Volume" value="$18,400.00" trend="+14%" />
             <RevenueInfo label="Net Platform Fee" value="$3,680.00" trend="+8%" color="teal.600" />
             <RevenueInfo label="Host Payouts" value="$14,720.00" trend="+12%" />
          </SimpleGrid>
        </Box>

      </Stack>
    </Box>
  );
}

// --- Border-Centric UI Components ---

function BorderStat({ label, value, icon, color }: any) {
  return (
    <Box border="1px solid" borderColor="gray.200" p={5} rounded="2xl" bg="white">
      <HStack gap={4}>
        <Center boxSize="40px" border="1px solid" borderColor="gray.100" rounded="xl">
          <Icon as={icon} color={color} boxSize={5} />
        </Center>
        <VStack align="start" gap={0}>
          <Text fontSize="2xs" fontWeight="black" color="gray.400" textTransform="uppercase" letterSpacing="wider">{label}</Text>
          <Text fontSize="xl" fontWeight="900">{value}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

function ActionRow({ icon, title, subtitle, time, isLast }: any) {
  return (
    <Box 
      px={6} py={5} 
      borderBottom={isLast ? "none" : "1px solid"} 
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }} 
      transition="background 0.2s"
      cursor="pointer"
    >
      <HStack justify="space-between">
        <HStack gap={4}>
          <Box color="gray.400">{icon}</Box>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="bold">{title}</Text>
            <Text fontSize="xs" color="gray.500">{subtitle}</Text>
          </VStack>
        </HStack>
        <Text fontSize="2xs" fontWeight="bold" color="gray.400">{time}</Text>
      </HStack>
    </Box>
  );
}

function DistributionMetric({ label, count, total, color }: any) {
  const width = (count / total) * 100;
  return (
    <VStack align="stretch" gap={2}>
      <HStack justify="space-between">
        <Text fontSize="xs" fontWeight="bold" color="gray.600">{label}</Text>
        <Text fontSize="xs" fontWeight="black">{count}</Text>
      </HStack>
      <Box h="8px" bg="gray.100" rounded="full" overflow="hidden">
        <Box w={`${width}%`} h="full" bg={color} />
      </Box>
    </VStack>
  );
}

function RevenueInfo({ label, value, trend, color = "gray.900" }: any) {
  return (
    <VStack align="start" gap={1}>
      <Text fontSize="2xs" fontWeight="black" color="gray.400" textTransform="uppercase">{label}</Text>
      <HStack gap={3}>
        <Heading size="xl" fontWeight="900" color={color}>{value}</Heading>
        <Badge variant="subtle" colorPalette="emerald" rounded="md" fontSize="2xs">{trend}</Badge>
      </HStack>
    </VStack>
  );
}