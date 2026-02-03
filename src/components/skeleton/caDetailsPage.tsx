import { Box, Container, Flex, Grid, HStack, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingSkeleton() {
    return (
        <Box bg="gray.50/50" minH="100vh" py="10">
            <Container maxW="breakpoint-xl">
                {/* 1. Header Skeleton */}
                <Stack gap="3" mb="8">
                    <Skeleton h="14px" w="240px" borderRadius="full" />
                    <Skeleton h="48px" w="60%" borderRadius="md" />
                    <HStack gap="4">
                        <Skeleton h="16px" w="120px" borderRadius="full" />
                        <Skeleton h="16px" w="150px" borderRadius="full" />
                    </HStack>
                </Stack>

                <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap="10">
                    {/* LEFT COLUMN */}
                    <Stack gap="10">
                        {/* Main Image Skeleton */}
                        <Skeleton h="500px" rounded="3xl" />

                        {/* Feature Cards Skeleton */}
                        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
                            {[1, 2, 3, 4].map((i) => (
                                <Stack key={i} align="center" p="5" bg="white" rounded="2xl" border="1px solid" borderColor="gray.100">
                                    <Skeleton h="48px" w="48px" rounded="xl" />
                                    <Skeleton h="12px" w="60px" borderRadius="full" />
                                </Stack>
                            ))}
                        </SimpleGrid>

                        {/* Description Skeleton */}
                        <Stack gap="4">
                            <Skeleton h="24px" w="150px" />
                            <Stack gap="2">
                                <Skeleton h="16px" w="full" />
                                <Skeleton h="16px" w="full" />
                                <Skeleton h="16px" w="80%" />
                            </Stack>
                        </Stack>

                        {/* Host Info Skeleton */}
                        <Flex p="6" rounded="3xl" bg="white" border="1px solid" borderColor="gray.100" justify="space-between" align="center">
                            <HStack gap="4">
                                <Skeleton h="56px" w="56px" rounded="full" />
                                <Stack gap="2">
                                    <Skeleton h="16px" w="120px" />
                                    <Skeleton h="12px" w="180px" />
                                </Stack>
                            </HStack>
                            <Skeleton h="40px" w="120px" rounded="xl" />
                        </Flex>
                    </Stack>

                    {/* RIGHT COLUMN: BOOKING CARD SKELETON */}
                    <Stack gap="6">
                        <Box bg="white" p="8" rounded="3xl" border="1px solid" borderColor="gray.100">
                            <Flex justify="space-between" align="center" mb="8">
                                <Skeleton h="32px" w="100px" />
                                <Skeleton h="24px" w="80px" rounded="full" />
                            </Flex>

                            {/* Date Inputs Skeleton */}
                            <Stack gap="4" mb="8">
                                <Skeleton h="12px" w="80px" />
                                <Grid templateColumns="1fr 1fr" gap="2">
                                    <Skeleton h="45px" rounded="xl" />
                                    <Skeleton h="45px" rounded="xl" />
                                </Grid>
                            </Stack>

                            {/* Extras Skeleton */}
                            <Stack gap="4" mb="8">
                                <Skeleton h="12px" w="60px" />
                                <Skeleton h="20px" w="full" />
                                <Skeleton h="20px" w="full" />
                            </Stack>

                            <Skeleton h="1px" w="full" mb="6" />

                            {/* Pricing Skeleton */}
                            <Stack gap="3" mb="8">
                                <Skeleton h="14px" w="full" />
                                <Skeleton h="14px" w="full" />
                                <Skeleton h="14px" w="full" />
                                <Flex justify="space-between" pt="4">
                                    <Skeleton h="24px" w="60px" />
                                    <Skeleton h="32px" w="100px" />
                                </Flex>
                            </Stack>

                            <Skeleton h="64px" w="full" rounded="2xl" />
                        </Box>

                        {/* Trust Badge Skeleton */}
                        <Skeleton h="70px" w="full" rounded="2xl" />
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}