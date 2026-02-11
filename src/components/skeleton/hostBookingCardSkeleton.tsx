"use client"

import {
    Box,
    Flex,
    Stack,
    HStack,
    SimpleGrid,
    Separator,
    SkeletonCircle,
    Skeleton,
} from "@chakra-ui/react";
// Import from your UI snippets or @chakra-ui/react


const HostBookingCardSkeleton = () => {
    return (
        <Box
            bg="white"
            rounded="3xl"
            p="5"
            border="1px solid"
            borderColor="gray.100"
        >
            <Flex direction={{ base: "column", md: "row" }} gap="6" align="center">

                {/* Section 1: Tenant Info Skeleton */}
                <HStack w={{ base: "full", md: "240px" }} gap="4">
                    <SkeletonCircle size="12" />
                    <Stack gap="2" flex="1">
                        <Skeleton height="10px" width="40px" />
                        <Skeleton height="16px" width="120px" />
                        <Skeleton height="10px" width="80px" />
                    </Stack>
                </HStack>

                <Separator orientation="vertical" h="50px" display={{ base: "none", md: "block" }} />

                {/* Section 2: Trip & Vehicle Info Skeleton */}
                <Stack flex="1" gap="4">
                    <HStack justify="space-between">
                        <Skeleton height="20px" width="100px" rounded="md" />
                        <Skeleton height="20px" width="60px" />
                    </HStack>

                    <SimpleGrid columns={2} gap="4">
                        <HStack gap="3">
                            <Skeleton height="32px" width="32px" rounded="lg" />
                            <Stack gap="1">
                                <Skeleton height="8px" width="60px" />
                                <Skeleton height="12px" width="100px" />
                            </Stack>
                        </HStack>
                        <HStack gap="3">
                            <Skeleton height="32px" width="32px" rounded="lg" />
                            <Stack gap="1">
                                <Skeleton height="8px" width="40px" />
                                <Skeleton height="12px" width="80px" />
                            </Stack>
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* Section 3: Action Button Skeleton */}
                <Skeleton height="36px" width="120px" rounded="xl" />
            </Flex>
        </Box>
    );
};

export default HostBookingCardSkeleton;