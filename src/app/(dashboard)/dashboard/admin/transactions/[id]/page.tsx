"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Box, Container, Flex, VStack, HStack, Heading, Text,
    Button, Badge, Separator, SimpleGrid, IconButton, Center
} from "@chakra-ui/react";
import {
    ArrowLeft, Copy, Download, ShieldCheck,
    CreditCard, User, Calendar, CheckCircle2
} from "lucide-react";

export default function TransactionDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    return (
        <Container maxW="850px" py={12}>
            {/* Navigation */}
            <Button
                variant="ghost"
                mb={8}
                onClick={() => router.back()}
                p={0}
                color="gray.500"
                _hover={{ bg: "transparent", color: "emerald.600" }}
            >
                <ArrowLeft size={16} style={{ marginRight: "8px" }} /> Back to Ledger
            </Button>

            <Box
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                rounded="3xl"
                position="relative"
                overflow="hidden"
            >
                {/* Status Banner */}
                <Box bg="emerald.500" h="6px" w="full" />

                {/* Top Receipt Header */}
                <Box p={10} borderBottom="1px dashed" borderColor="gray.200">
                    <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={6}>
                        <VStack align="start" gap={1}>
                            <HStack>
                                <Badge variant="surface" colorPalette="emerald" rounded="full" px={3} py={0.5}>
                                    <HStack gap={1}>
                                        <CheckCircle2 size={12} />
                                        <Text fontSize="2xs" fontWeight="black">SUCCESSFUL</Text>
                                    </HStack>
                                </Badge>
                                <Text fontSize="xs" fontWeight="bold" color="gray.400" fontFamily="mono">
                                    {id}
                                </Text>
                            </HStack>
                            <Heading size="3xl" fontWeight="900" letterSpacing="tight" mt={2}>
                                $1,250.00
                            </Heading>
                            <Text fontSize="sm" color="gray.500" fontWeight="medium">
                                Processed on January 28, 2026 • 10:42 PM
                            </Text>
                        </VStack>

                        <HStack gap={3}>
                            
                            <IconButton
                                aria-label="Copy"
                                variant="solid"
                                rounded="xl"
                                size="sm"
                                borderColor="gray.200"
                            >
                                <Copy size={16} />
                            </IconButton>
                        </HStack>
                    </Flex>
                </Box>

                {/* Detail Body */}
                <Box p={10}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mb={12}>
                        <VStack align="start" gap={2}>
                            <HStack  >
                                <User size={14} />
                                <Text fontSize="2xs" fontWeight="black" letterSpacing="widest">CUSTOMER</Text>
                            </HStack>
                            <Box>
                                <Text fontWeight="bold" fontSize="md">Alex Rivera</Text>
                                <Text fontSize="xs" color="gray.500">alex@example.com</Text>
                            </Box>
                        </VStack>

                        <VStack align="start" gap={2}>
                            <HStack  >
                                <CreditCard size={14} />
                                <Text fontSize="2xs" fontWeight="black" letterSpacing="widest">PAYMENT</Text>
                            </HStack>
                            <Box>
                                <Text fontWeight="bold" fontSize="md">Visa •••• 4242</Text>
                                <Text fontSize="xs" color="gray.500">Authorized by Stripe</Text>
                            </Box>
                        </VStack>

                        <VStack align="start" gap={2}>
                            <HStack  >
                                <Calendar size={14} />
                                <Text fontSize="2xs" fontWeight="black" letterSpacing="widest">BILLING CYCLE</Text>
                            </HStack>
                            <Box>
                                <Text fontWeight="bold" fontSize="md">Jan 2026</Text>
                                <Text fontSize="xs" color="gray.500">Monthly Marketplace Fee</Text>
                            </Box>
                        </VStack>
                    </SimpleGrid>

                    {/* Pricing Table */}
                    <Box bg="gray.50/50" p={8} rounded="2xl" border="1px solid" borderColor="gray.100" mb={10}>
                        <Text fontSize="2xs" fontWeight="black" color="gray.400" letterSpacing="widest" mb={6}>
                            LINE ITEMS
                        </Text>
                        <VStack align="stretch" gap={5}>
                            <Flex justify="space-between">
                                <Text fontSize="sm" fontWeight="medium" color="gray.600">Premium Vehicle Booking Fee</Text>
                                <Text fontSize="sm" fontWeight="bold">$1,100.00</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text fontSize="sm" fontWeight="medium" color="gray.600">Full Coverage Insurance (SLA-4)</Text>
                                <Text fontSize="sm" fontWeight="bold">$100.00</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text fontSize="sm" fontWeight="medium" color="gray.600">Platform Service Tax (5%)</Text>
                                <Text fontSize="sm" fontWeight="bold">$50.00</Text>
                            </Flex>
                            <Separator borderColor="gray.200" />
                            <Flex justify="space-between" pt={2}>
                                <Text fontSize="md" fontWeight="900">Total Amount Paid</Text>
                                <Text fontSize="xl" fontWeight="900" color="emerald.600">$1,250.00</Text>
                            </Flex>
                        </VStack>
                    </Box>

                    {/* Security Footer */}
                    <Flex
                        bg="emerald.900"
                        p={6}
                        rounded="2xl"
                        align="center"
                        gap={4} 
                    >
                        <Center bg="white/10" p={3} rounded="xl">
                            <ShieldCheck size={24} className="text-emerald-400" />
                        </Center>
                        <VStack align="start" gap={0}>
                            <Text fontSize="sm" fontWeight="bold">Secure Encrypted Transaction</Text>
                            <Text fontSize="xs" opacity={0.7}>
                                Verified via 256-bit SSL encryption. Transaction cleared through Stripe Radar Fraud Protection.
                            </Text>
                        </VStack>
                    </Flex>
                </Box>
            </Box>

           
        </Container>
    );
}