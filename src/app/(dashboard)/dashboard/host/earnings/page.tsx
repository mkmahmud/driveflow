"use client";

import { Heading, Text, VStack, HStack, Box, SimpleGrid, Badge, Button, Flex, Separator, Center, Grid } from "@chakra-ui/react";
import { 
  Wallet, ArrowUpRight, ArrowDownRight, 
  Download, Calendar, Landmark, Info 
} from "lucide-react";

export default function HostEarningsPage() {
  return (
    <Box maxW="1200px" mx="auto" py={8}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={10}>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" fontWeight="black" color="emerald.600" letterSpacing="0.2em">FINANCE</Text>
          <Heading size="2xl" fontWeight="900" letterSpacing="-0.02em">Earnings</Heading>
        </VStack>
        <HStack gap={3}>
          {/* @ts-ignore */}
           <Button variant="outline" borderColor="gray.200" rounded="xl" leftIcon={<Download size={16}/>}>Export Tax Form</Button>
           <Button bg="black" color="white" rounded="xl" px={6}>Withdraw Funds</Button>
        </HStack>
      </Flex>

      {/* Financial Summary Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5} mb={10}>
        <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl" bg="white">
          <Text fontSize="2xs" fontWeight="black" color="gray.400" mb={2}>AVAILABLE FOR WITHDRAWAL</Text>
          <Heading size="2xl" fontWeight="900">$2,840.50</Heading>
          <HStack mt={4} color="emerald.600">
            <Landmark size={14} />
            <Text fontSize="xs" fontWeight="bold">Linked to Chase ****4210</Text>
          </HStack>
        </Box>

        <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl" bg="white">
          <Text fontSize="2xs" fontWeight="black" color="gray.400" mb={2}>PENDING (ESCROW)</Text>
          <Heading size="2xl" fontWeight="900" color="gray.400">$1,120.00</Heading>
          <HStack mt={4} color="orange.500">
            <Calendar size={14} />
            <Text fontSize="xs" fontWeight="bold">Releasing in 3-5 days</Text>
          </HStack>
        </Box>

        <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl" bg="gray.900" color="white">
          <Text fontSize="2xs" fontWeight="black" color="whiteAlpha.600" mb={2}>LIFETIME REVENUE</Text>
          <Heading size="2xl" fontWeight="900">$48,920.00</Heading>
          <HStack mt={4} color="emerald.400">
            <ArrowUpRight size={14} />
            <Text fontSize="xs" fontWeight="bold">+15% from last year</Text>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Earnings Breakdown & History */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        
        {/* Payout History Ledger */}
        <Box border="1px solid" borderColor="gray.200" rounded="2xl" overflow="hidden">
          <Box p={5} borderBottom="1px solid" borderColor="gray.100" bg="gray.50/50">
            <Heading size="sm" fontWeight="900">Payout History</Heading>
          </Box>
          <VStack align="stretch" gap={0}>
            <PayoutRow date="Jan 24, 2026" amount="$1,420.00" status="Completed" method="Direct Deposit" />
            <PayoutRow date="Jan 17, 2026" amount="$980.50" status="Completed" method="Direct Deposit" />
            <PayoutRow date="Jan 10, 2026" amount="$2,100.00" status="Completed" method="Direct Deposit" />
            <PayoutRow date="Jan 03, 2026" amount="$1,150.00" status="Completed" method="Direct Deposit" isLast />
          </VStack>
        </Box>

        {/* Revenue Insights Sidebar */}
        <VStack gap={6} align="stretch">
          <Box border="1px solid" borderColor="gray.200" p={6} rounded="2xl">
            <Heading size="sm" fontWeight="900" mb={4}>Fee Breakdown</Heading>
            <Text fontSize="xs" color="gray.500" mb={6}>Based on your Pro-Host tier (20% platform fee).</Text>
            
            <VStack align="stretch" gap={4}>
               <FeeItem label="Booking Subtotal" value="$1,200.00" />
               <FeeItem label="Platform Fee (20%)" value="-$240.00" isNegative />
               <FeeItem label="Insurance Protection" value="-$60.00" isNegative />
               <Separator />
               <HStack justify="space-between" pt={2}>
                  <Text fontWeight="black" fontSize="sm">Your Net Take</Text>
                  <Text fontWeight="black" fontSize="md" color="emerald.600">$900.00</Text>
               </HStack>
            </VStack>
          </Box>

          <Box border="1px solid" borderColor="blue.100" bg="blue.50/30" p={5} rounded="2xl">
             <HStack mb={2}>
                <Info size={16} className="text-blue-600" />
                <Text fontSize="xs" fontWeight="black" color="blue.800">TAX INFORMATION</Text>
             </HStack>
             <Text fontSize="xs" color="blue.700">Your 2025 1099-K form is now ready for download in the documents portal.</Text>
          </Box>
        </VStack>

      </Grid>
    </Box>
  );
}

// --- Internal Components ---

function PayoutRow({ date, amount, status, method, isLast }: any) {
  return (
    <Box p={5} borderBottom={isLast ? "none" : "1px solid"} borderColor="gray.100" _hover={{ bg: "gray.50" }}>
      <HStack justify="space-between">
        <HStack gap={4}>
          <Center boxSize="40px" border="1px solid" borderColor="gray.200" rounded="xl" bg="white">
            <ArrowDownRight size={18} className="text-emerald-600" />
          </Center>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="900">{amount}</Text>
            <Text fontSize="xs" color="gray.500">{date} • {method}</Text>
          </VStack>
        </HStack>
        <Badge colorPalette="emerald" variant="surface" rounded="md" fontSize="2xs" px={2}>
          {status}
        </Badge>
      </HStack>
    </Box>
  );
}

function FeeItem({ label, value, isNegative }: any) {
  return (
    <HStack justify="space-between">
      <Text fontSize="xs" fontWeight="bold" color="gray.500">{label}</Text>
      <Text fontSize="xs" fontWeight="black" color={isNegative ? "red.500" : "gray.900"}>
        {value}
      </Text>
    </HStack>
  );
}