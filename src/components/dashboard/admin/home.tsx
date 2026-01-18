import { Heading, Text, Stack, Grid, Box, CardBody, HStack, Icon } from "@chakra-ui/react"
import { Card } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"
import { AlertTriangle, ChevronRight, Truck, Users } from "lucide-react";
import DataTable from "../DataTable";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";

interface Booking {
    id: string
    client: string
    date: string
    status: "Confirmed" | "Pending"
}

const columns = [
    { header: "Client Name", accessor: "client", sortable: true },
    { header: "Booking Date", accessor: "date", sortable: true },
    {
        header: "Status",
        accessor: "status",
        render: (value: string) => (
            <Box
                px="2" py="1" rounded="full" fontSize="2xs" fontWeight="bold"
                bg={value === "Confirmed" ? "green.50" : "yellow.50"}
                color={value === "Confirmed" ? "green.600" : "yellow.600"}
                display="inline-block"
            >
                {value}
            </Box>
        )
    }
]

const dummyData: Booking[] = [
    { id: "1", client: "Alex Johnson", date: "2024-05-20", status: "Confirmed" },
    { id: "2", client: "Maria Garcia", date: "2024-05-21", status: "Pending" },
    { id: "3", client: "Liam Smith", date: "2024-05-22", status: "Confirmed" },
    { id: "4", client: "Sophia Lee", date: "2024-05-23", status: "Confirmed" },
    { id: "5", client: "James Brown", date: "2024-05-24", status: "Pending" },
    { id: "6", client: "Olivia Davis", date: "2024-05-25", status: "Confirmed" },
]




export default function AdminHome() {

 
    return (
        <Box>
            <Stack gap="6">
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
                    {/* Active Users Card */}
                    <Card.Root border="1px solid" borderColor="#0D9488/20" bg="transparent" p="4"  >
                        <CardBody>
                            <Stack>
                                <HStack justify="space-between" align="flex-start">
                                    <Box>
                                        <Text color="gray.500" fontSize="sm" fontWeight="medium">Active Users</Text>
                                        <Heading size="lg" mt="1" color="teal.500">12,450</Heading>
                                    </Box>
                                    <Box bg="blue.50" p="3" borderRadius="lg">
                                        <Icon as={Users} boxSize="6" color="blue.500" />
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Text color="green.500" fontSize="sm" fontWeight="medium">
                                        <Icon as={ChevronRight} boxSize="3" /> ~5.2%
                                    </Text>
                                    <Text color="gray.500" fontSize="sm">from last month</Text>
                                </HStack>
                            </Stack>
                        </CardBody>
                    </Card.Root>

                    {/* Open Disputes Card */}
                    <Card.Root border="1px solid" borderColor="#0D9488/20" bg="transparent" p="4"  >
                        <CardBody>
                            <Stack>
                                <HStack justify="space-between" align="flex-start">
                                    <Box>
                                        <Text color="gray.500" fontSize="sm" fontWeight="medium">Open Disputes</Text>
                                        <Heading size="lg" mt="1" color="orange.500">18</Heading>
                                    </Box>
                                    <Box bg="orange.50" p="3" borderRadius="lg">
                                        <Icon as={AlertTriangle} boxSize="6" color="orange.500" />
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Text color="green.500" fontSize="sm" fontWeight="medium">
                                        <Icon as={ChevronRight} boxSize="3" /> ~2.1%
                                    </Text>
                                    <Text color="gray.500" fontSize="sm">from last month</Text>
                                </HStack>
                            </Stack>
                        </CardBody>
                    </Card.Root>

                    {/* Fleet Utilization Card */}
                    <Card.Root border="1px solid" borderColor="#0D9488/20" bg="transparent" p="4"     >
                        <CardBody>
                            <Stack>
                                <HStack justify="space-between" align="flex-start">
                                    <Box>
                                        <Text color="gray.500" fontSize="sm" fontWeight="medium">Fleet Utilization</Text>
                                        <Heading size="lg" mt="1" color="green.500">84%</Heading>
                                    </Box>
                                    <Box bg="green.50" p="3" borderRadius="lg">
                                        <Icon as={Truck} boxSize="6" color="green.500" />
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Text color="green.500" fontSize="sm" fontWeight="medium">
                                        <Icon as={ChevronRight} boxSize="3" /> ~1.5%
                                    </Text>
                                    <Text color="gray.500" fontSize="sm">from last month</Text>
                                </HStack>
                            </Stack>
                        </CardBody>
                    </Card.Root>
                </Grid>
            </Stack>

            <Box>
                <Heading mb="6">Recent Bookings</Heading>
                {/* @ts-ignore */}
                <DataTable columns={columns} data={dummyData} pageSize={5} />
            </Box>
        </Box>
    )
}
