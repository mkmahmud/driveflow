"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Box, Container, Flex, VStack, HStack, Heading, Text,
    Button, Badge, Separator, SimpleGrid, Grid, GridItem, Progress
} from "@chakra-ui/react";
import {
    ArrowLeft, Fuel, Gauge, PenSquare,
    History, Settings, ShieldCheck,   Map
} from "lucide-react";

export default function AdminCarDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    return (
        <Container maxW="1100px" py={12}>
            <Flex justify="space-between" align="flex-start" mb={10}>
                <VStack align="start" gap={0}>
                    <Button variant="ghost" onClick={() => router.back()} p={0} color="gray.500">
                        <ArrowLeft size={16} /> <Text ml={2}>Back to Fleet</Text>
                    </Button>
                    <Heading size="2xl" fontWeight="900">Tesla Model 3</Heading>
                    <Text color="gray.500" fontWeight="bold">VIN: 5YJ3E1EA6JFXXXXXX • Plate: EV-9021</Text>
                </VStack>
                <HStack>
                    <Button   rounded="xl"><Settings size={16} /></Button>
                    <Button bg="black" color="white" rounded="xl"><PenSquare size={16} style={{ marginRight: '8px' }} /> Edit Details</Button>
                </HStack>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={8}>

                {/* Left: Overview & Condition */}
                <GridItem colSpan={2}>
                    <VStack gap={8} align="stretch">
                        {/* Main Visual/Spec Card */}
                        <Box bg="white" border="1px solid" borderColor="gray.200" rounded="3xl" p={8}>
                            <SimpleGrid columns={3} gap={6}>
                                <DetailItem label="TOTAL REVENUE" value="$14,250.00" sub="32 Bookings" />
                                <DetailItem label="UTILIZATION" value="84%" sub="Active this month" />
                                <DetailItem label="HOST CUT" value="80/20" sub="Standard Split" />
                            </SimpleGrid>

                            <Separator my={8} />

                            <Text fontSize="xs" fontWeight="black" color="gray.400" mb={4} letterSpacing="widest">LIVE TELEMETRY</Text>
                            <SimpleGrid columns={2} gap={4}>
                                <TelemetryCard icon={<Fuel size={18} />} label="Range" value="240 miles" />
                                <TelemetryCard icon={<Gauge size={18} />} label="Odometer" value="12,402 mi" />
                            </SimpleGrid>
                        </Box>

                        {/* Maintenance Log */}
                        <Box bg="white" border="1px solid" borderColor="gray.200" rounded="3xl" p={8}>
                            <HStack justify="space-between" mb={6}>
                                <Text fontSize="xs" fontWeight="black" color="gray.400" letterSpacing="widest">MAINTENANCE HISTORY</Text>
                                <Button size="xs" variant="ghost" color="blue.600">Add Log</Button>
                            </HStack>
                            <VStack gap={4} align="stretch">
                                <LogEntry date="Jan 15, 2026" task="Tire Rotation" provider="Tesla Service" cost="$80.00" />
                                <LogEntry date="Nov 02, 2025" task="Full Detailing" provider="CleanCar Co." cost="$150.00" />
                                <LogEntry date="Aug 10, 2025" task="Brake Pad Replacement" provider="Tesla Service" cost="$420.00" />
                            </VStack>
                        </Box>
                    </VStack>
                </GridItem>

                {/* Right: Host Info & Location */}
                <GridItem>
                    <VStack gap={6} align="stretch">
                        {/* Host Profile */}
                        <Box bg="white" border="1px solid" borderColor="gray.200" rounded="3xl" p={6}>
                            <Text fontSize="xs" fontWeight="black" color="gray.400" mb={4}>OWNED BY</Text>
                            <HStack gap={4} mb={6}>
                                <Box boxSize="50px" bg="blue.500" rounded="full" />
                                <VStack align="start" gap={0}>
                                    <Text fontWeight="black">Sarah Jenkins</Text>
                                    <Text fontSize="xs" color="gray.500">Pro Host • 4.9 ★</Text>
                                </VStack>
                            </HStack>
                            <Button w="full" variant="outline" rounded="xl" size="sm">Contact Host</Button>
                        </Box>

                        {/* Safety & Compliance */}
                        <Box bg="gray.900" color="white" rounded="3xl" p={6}>
                            <Text fontSize="xs" fontWeight="black" color="white/30" mb={4}>COMPLIANCE</Text>
                            <VStack align="stretch" gap={4}>
                                <HStack justify="space-between">
                                    <Text fontSize="xs">Registration</Text>
                                    <Badge bg="emerald.500" color="white" size="xs">ACTIVE</Badge>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text fontSize="xs">Commercial Ins.</Text>
                                    <Badge bg="emerald.500" color="white" size="xs">VERIFIED</Badge>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text fontSize="xs">Last Inspection</Text>
                                    <Text fontSize="xs" fontWeight="bold">Dec 2025</Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>
        </Container>
    );
}

// Helper Components
function DetailItem({ label, value, sub }: any) {
    return (
        <VStack align="start" gap={0}>
            <Text fontSize="2xs" fontWeight="black" color="gray.400">{label}</Text>
            <Text fontSize="xl" fontWeight="900">{value}</Text>
            <Text fontSize="2xs" color="gray.500" fontWeight="bold">{sub}</Text>
        </VStack>
    );
}

function TelemetryCard({ icon, label, value }: any) {
    return (
        <HStack p={4} bg="gray.50" rounded="2xl" gap={4} border="1px solid" borderColor="gray.100">
            <Box color="blue.500">{icon}</Box>
            <VStack align="start" gap={0}>
                <Text fontSize="2xs" fontWeight="black" color="gray.400" textTransform="uppercase">{label}</Text>
                <Text fontSize="md" fontWeight="black">{value}</Text>
            </VStack>
        </HStack>
    );
}

function LogEntry({ date, task, provider, cost }: any) {
    return (
        <HStack justify="space-between" py={2}>
            <VStack align="start" gap={0}>
                <Text fontSize="sm" fontWeight="bold">{task}</Text>
                <Text fontSize="2xs" color="gray.500">{date} • {provider}</Text>
            </VStack>
            <Text fontSize="sm" fontWeight="black" color="gray.700">{cost}</Text>
        </HStack>
    );
}