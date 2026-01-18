import { Heading, Text, Stack, Grid, Box, CardBody, HStack, Icon } from "@chakra-ui/react"
import { Card } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"
import { AlertTriangle, ChevronRight, DollarSign, Truck, Users } from "lucide-react";
export default function UserHome() {
    return (
        <Stack gap="6">
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
                {/* Completed Rides Card */}
                <Card.Root border="1px solid" borderColor="#0D9488/20" bg="transparent" p="4"  >
                    <CardBody>
                        <Stack>
                            <HStack justify="space-between" align="flex-start">
                                <Box>
                                    <Text color="gray.500" fontSize="sm" fontWeight="medium">Completed Rides</Text>
                                    <Heading size="lg" mt="1" color="teal.500">164</Heading>
                                </Box>
                                <Box bg="blue.50" p="3" borderRadius="lg">
                                    <Icon as={Users} boxSize="6" color="blue.500" />
                                </Box>
                            </HStack>

                        </Stack>
                    </CardBody>
                </Card.Root>

                {/* Total Spends Card */}
                <Card.Root border="1px solid" borderColor="#0D9488/20" bg="transparent" p="4"  >
                    <CardBody>
                        <Stack>
                            <HStack justify="space-between" align="flex-start">
                                <Box>
                                    <Text color="gray.500" fontSize="sm" fontWeight="medium">Total Spends</Text>
                                    <Heading size="lg" mt="1" color="orange.500">$18,980</Heading>
                                </Box>
                                <Box bg="orange.50" p="3" borderRadius="lg">
                                    <Icon as={DollarSign} boxSize="6" color="orange.500" />
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


            </Grid>
        </Stack>
    )
}
