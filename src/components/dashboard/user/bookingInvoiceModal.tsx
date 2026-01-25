    "use client"

    import {
        Box, Stack, Text, Heading, HStack, Flex, Separator,
        DialogRoot, DialogContent, DialogHeader, DialogBody, DialogCloseTrigger,
        DialogTitle, Icon, Badge, Button
    } from "@chakra-ui/react"
    import { Printer, Download, Receipt, Calendar, Car, ShieldCheck } from "lucide-react"

    export function BookingInvoiceModal({ booking, open, onOpenChange }: any) {
        if (!booking) return null;

        // Calculate days for the invoice display
        const days = Math.ceil(
            (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 3600 * 24)
        ) || 1;

        const basePrice = booking.totalPrice - booking.serviceFee;

        return (
            <DialogRoot open={open} onOpenChange={onOpenChange} size="md" placement="top" >
                <DialogContent rounded="3xl" p="4">
                    <DialogHeader borderBottomWidth="1px" borderColor="gray.100" pb="4">
                        <Flex justify="space-between" align="center">
                            <HStack gap="3">
                                <Box p="2" bg="teal.50" rounded="xl" color="teal.600">
                                    <Receipt size={20} />
                                </Box>
                                <DialogTitle fontWeight="800">Booking Invoice</DialogTitle>
                            </HStack>
                            <Badge colorPalette="teal" variant="subtle" rounded="md">
                                {booking.status}
                            </Badge>
                        </Flex>
                    </DialogHeader>

                    <DialogBody py="6">
                        <Stack gap="6">
                            {/* 1. Transaction Details */}
                            <Flex justify="space-between" align="center">
                                <Stack gap="0">
                                    <Text fontSize="xs" color="gray.400" fontWeight="bold">INVOICE NUMBER</Text>
                                    <Text fontWeight="bold">#{booking.id.slice(-8).toUpperCase()}</Text>
                                </Stack>
                                <Stack gap="0" align="flex-end">
                                    <Text fontSize="xs" color="gray.400" fontWeight="bold">DATE ISSUED</Text>
                                    <Text fontWeight="bold">{new Date(booking.createdAt).toLocaleDateString()}</Text>
                                </Stack>
                            </Flex>

                            <Separator opacity="0.5" />

                            {/* 2. Car & Trip Details */}
                            <HStack gap="4" bg="gray.50" p="4" rounded="2xl">
                                <Box boxSize="12" bg="white" rounded="xl" p="2" border="1px solid" borderColor="gray.100">
                                    <Car size={32} className="text-teal-600" />
                                </Box>
                                <Stack gap="0">
                                    <Text fontWeight="800" fontSize="md">{booking.car.brand} {booking.car.model}</Text>
                                    <HStack gap="1" color="gray.500" fontSize="xs">
                                        <Calendar size={12} />
                                        <Text>{days} Days Trip</Text>
                                    </HStack>
                                </Stack>
                            </HStack>

                            {/* 3. Price Breakdown */}
                            <Stack gap="3">
                                <Text fontSize="xs" color="gray.400" fontWeight="bold" letterSpacing="widest">PRICE BREAKDOWN</Text>

                                <Flex justify="space-between">
                                    <Text color="gray.600">Base Rate (${Math.round(basePrice / days)}/day)</Text>
                                    <Text fontWeight="bold">${basePrice}</Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <HStack gap="2">
                                        <Text color="gray.600">Protection Plan</Text>
                                        <Badge size="xs" colorPalette="blue">{booking.protectionPlan}</Badge>
                                    </HStack>
                                    <Text fontWeight="bold">Included</Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <Text color="gray.600">Service Fee</Text>
                                    <Text fontWeight="bold">${booking.serviceFee}</Text>
                                </Flex>

                                {booking.includeTank && (
                                    <Flex justify="space-between">
                                        <Text color="gray.600">Full Tank Add-on</Text>
                                        <Text fontWeight="bold">Included</Text>
                                    </Flex>
                                )}
                            </Stack>

                            <Box bg="gray.900" p="5" rounded="2xl" color="white">
                                <Flex justify="space-between" align="center">
                                    <Text fontWeight="bold">Total Amount Paid</Text>
                                    <Heading size="md">${booking.totalPrice}</Heading>
                                </Flex>
                            </Box>

                            {/* Actions */}
                            <HStack gap="3" pt="2">
                                <Button flex="1" variant="outline" rounded="xl"   onClick={() => window.print()}>
                                    Print
                                </Button>
                                <Button flex="1" colorPalette="teal" rounded="xl"  >
                                    Download PDF
                                </Button>
                            </HStack>
                        </Stack>
                    </DialogBody>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        )
    }