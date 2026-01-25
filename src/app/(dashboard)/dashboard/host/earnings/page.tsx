"use client"

import {
  Box, Flex, Stack, HStack, Text, Heading, SimpleGrid,
  Icon, Badge, Table, Button, Card, Separator, Progress
} from "@chakra-ui/react"
import {
  DollarSign, Car, CalendarCheck, TrendingUp,
  ArrowUpRight, Download, MoreHorizontal
} from "lucide-react"

export default function Earnings() {
  return (
    <Box p={{ base: "4", md: "8" }} bg="gray.50" minH="100vh">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="8">
        <Stack gap="1">
          <Heading size="xl" fontWeight="900" letterSpacing="-0.03em">
            Earnings Overview
          </Heading>
          <Text color="gray.500" fontWeight="medium">
            Monitor your fleet performance and payouts.
          </Text>
        </Stack>
        <Button colorPalette="teal" size="md" rounded="xl"  >
          Export Report
        </Button>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb="8">
        <StatCard
          label="Total Earnings"
          value="$12,850.00"
          change="+12.5%"
          icon={DollarSign}
          color="teal"
        />
        <StatCard
          label="Active Fleet"
          value="8 Cars"
          change="All available"
          icon={Car}
          color="blue"
        />
        <StatCard
          label="Bookings"
          value="142"
          change="+18 last month"
          icon={CalendarCheck}
          color="purple"
        />
        <StatCard
          label="Avg. Rating"
          value="4.9"
          change="Top Rated Host"
          icon={TrendingUp}
          color="orange"
        />
      </SimpleGrid>

      {/* Main Content: Performance by Car & Recent Activity */}
      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="8">

        {/* Earnings by Vehicle Table */}
        <Box   bg="white" rounded="3xl" shadow="sm" borderWidth="1px" p="6"  >
          <Heading size="md" mb="6">Performance by Vehicle</Heading>
          <Table.Root variant="line" size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Vehicle</Table.ColumnHeader>
                <Table.ColumnHeader>Bookings</Table.ColumnHeader>
                <Table.ColumnHeader>Utilization</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">Revenue</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <CarRow name="Tesla Model 3" bookings={42} revenue="$4,200" util={85} />
              <CarRow name="Porsche 911" bookings={12} revenue="$5,800" util={40} />
              <CarRow name="BMW X5" bookings={28} revenue="$2,850" util={72} />
            </Table.Body>
          </Table.Root>
        </Box>

        {/* Payout Summary Card */}
        <Card.Root bg="gray.900" color="white" rounded="3xl" p="6" shadow="xl">
          <Stack gap="6">
            <Box>
              <Text color="gray.400" fontSize="sm" fontWeight="bold">AVAILABLE FOR WITHDRAWAL</Text>
              <Heading size="2xl" mt="2">$3,420.50</Heading>
            </Box>

            <Separator opacity="0.2" />

            <Stack gap="4">
              <Flex justify="space-between">
                <Text color="gray.400">Next Payout</Text>
                <Text fontWeight="bold">Jan 28, 2026</Text>
              </Flex>
              <Progress.Root value={70} colorPalette="teal" size="sm" rounded="full">
                <Progress.Track bg="white/10">
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <Text fontSize="xs" color="gray.500">
                You've reached 70% of your monthly goal ($5,000)
              </Text>
            </Stack>

            <Button w="full" bg="white" color="gray.900" rounded="2xl" fontWeight="bold" h="12" _hover={{ bg: "teal.50" }}>
              Withdraw Funds
            </Button>
          </Stack>
        </Card.Root>

      </SimpleGrid>
    </Box>
  )
}


function StatCard({ label, value, change, icon: IconBtn, color }: any) {
  return (
    <Box bg="white" p="6" rounded="3xl" shadow="sm" borderWidth="1px" position="relative" overflow="hidden">
      <HStack justify="space-between" mb="4">
        <Box p="2" bg={`${color}.50`} rounded="xl" color={`${color}.600`}>
          <IconBtn size={20} />
        </Box>
        <Badge variant="subtle" colorPalette={color === "orange" ? "orange" : "teal"} rounded="full">
          {change}
        </Badge>
      </HStack>
      <Stack gap="0">
        <Text color="gray.500" fontSize="sm" fontWeight="bold">{label}</Text>
        <Heading size="lg" fontWeight="900" color="gray.800">{value}</Heading>
      </Stack>
    </Box>
  )
}

function CarRow({ name, bookings, revenue, util }: any) {
  return (
    <Table.Row _hover={{ bg: "gray.50" }} transition="bg 0.2s">
      <Table.Cell py="4">
        <Text fontWeight="bold" color="gray.800">{name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Badge variant="outline" rounded="md">{bookings} trips</Badge>
      </Table.Cell>
      <Table.Cell>
        <HStack gap="3">
          <Progress.Root value={util} w="60px" colorPalette="teal" size="xs">
            <Progress.Track><Progress.Range /></Progress.Track>
          </Progress.Root>
          <Text fontSize="xs" fontWeight="bold">{util}%</Text>
        </HStack>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Text fontWeight="900" color="teal.600">{revenue}</Text>
      </Table.Cell>
    </Table.Row>
  )
}