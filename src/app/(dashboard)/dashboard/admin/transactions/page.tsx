"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Table, Heading, Badge, Text, VStack, HStack,
  Container, Input, Flex, SimpleGrid, IconButton
} from "@chakra-ui/react";
import {
  ArrowUpRight, ArrowDownLeft, Search, Filter,
  Download, CreditCard, Banknote, ChevronRight, X
} from "lucide-react";
import DataTable from "@/components/dashboard/DataTable";

// Mock Data
const MOCK_TRANSACTIONS = [
  { id: "TRX-9021", user: "Alex Rivera", email: "alex@example.com", amount: "$1,250.00", date: "Jan 28, 2026", type: "Booking", status: "Completed", method: "Visa •••• 4242" },
  { id: "TRX-8842", user: "Sarah Chen", email: "sarah@test.com", amount: "$450.00", date: "Jan 27, 2026", type: "Security Deposit", status: "Held", method: "Apple Pay" },
  { id: "TRX-8710", user: "Marcus Vogt", email: "marcus@company.com", amount: "$2,800.00", date: "Jan 26, 2026", type: "Refund", status: "Processed", method: "Bank Transfer" },
  { id: "TRX-8655", user: "Elena Rossi", email: "elena@web.com", amount: "$150.00", date: "Jan 25, 2026", type: "Extra Mileage", status: "Failed", method: "Mastercard •••• 8812" },
  { id: "TRX-8656", user: "Elena Rossi", email: "elena@web.com", amount: "$150.00", date: "Jan 25, 2026", type: "Extra Mileage", status: "Failed", method: "Mastercard •••• 8812" },
  { id: "TRX-8659", user: "Elena Rossi", email: "elena@web.com", amount: "$150.00", date: "Jan 25, 2026", type: "Extra Mileage", status: "Failed", method: "Mastercard •••• 8812" },
];

export default function AdminTransactionsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Search Logic
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((trx) =>
      trx.id.toLowerCase().includes(search.toLowerCase()) ||
      trx.user.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Container maxW="1200px" py={10}>
      <Flex justify="space-between" align="flex-end" mb={10}>
        <VStack align="start" gap={1}>
          <Text fontSize="xs" fontWeight="black" color="emerald.600" letterSpacing="widest">FINANCIAL LEDGER</Text>
          <Heading size="2xl" fontWeight="900" letterSpacing="tight">Transactions</Heading>
        </VStack>

        <HStack gap={3}>
          {/* Interactive Search Bar */}
          <Box border="1px solid" borderColor="gray.200" rounded="xl" px={4} py={2} bg="white" minW="300px">
            <HStack gap={2}>
              <Search size={16} className="text-gray-400" />
              <Input
                variant="flushed"
                placeholder="Search Transaction ID or User..."
                fontSize="sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                _focus={{ outline: "none" }}
              />
              {search && (
                <IconButton
                  aria-label="Clear"
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearch("")}
                >
                  <X size={14} />
                </IconButton>
              )}
            </HStack>
          </Box>
        </HStack>
      </Flex>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <StatCard label="Total Volume" value="$45,280.00" icon={<Banknote />} color="emerald" />
        <StatCard label="Pending Deposits" value="$8,120.00" icon={<CreditCard />} color="orange" />
        <StatCard label="Active Refunds" value="$1,400.00" icon={<ArrowUpRight />} color="gray" />
      </SimpleGrid>

      {/* Interactive Table */}
      <DataTable
        data={filteredTransactions}
        pageSize={5}
        onRowClick={(trx) => router.push(`/dashboard/admin/transactions/${trx.id}`)}
        columns={[
          {
            header: "ID / DATE",
            accessor: "id",
            sortable: true,
            render: (val, trx) => (
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="sm">{trx.id}</Text>
                <Text fontSize="2xs" color="gray.400">{trx.date}</Text>
              </VStack>
            )
          },
          { header: "CUSTOMER", accessor: "user", sortable: true },
          {
            header: "AMOUNT",
            accessor: "amount",
            render: (val) => <Text fontWeight="900">{val}</Text>
          },
         ]}
      />
    </Container>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <Box p={6} border="1px solid" borderColor="gray.200" rounded="2xl" bg="white">
      <HStack justify="space-between" mb={3}>
        <Box p={2} bg={`${color}.50`} color={`${color}.600`} rounded="lg">{icon}</Box>
      </HStack>
      <Text fontSize="sm" fontWeight="bold" color="gray.500">{label}</Text>
      <Text fontSize="2xl" fontWeight="900">{value}</Text>
    </Box>
  );
}