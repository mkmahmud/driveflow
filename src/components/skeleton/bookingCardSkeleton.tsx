"use client";

import { Box, Flex, Stack, SimpleGrid, Skeleton, SkeletonCircle, HStack } from "@chakra-ui/react";

const BookingCardSkeleton = () => {
    return (
        <Box
            bg="white"
            rounded="3xl"
            p="5"
            border="1px solid"
            borderColor="gray.100"
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                gap="6"
                align={{ base: "stretch", md: "center" }}
            >
                {/* 1. Car Image Skeleton */}
                <Box
                    w={{ base: "full", md: "200px" }}
                    h="120px"
                    rounded="2xl"
                    overflow="hidden"
                >
                    <Skeleton w="full" h="full" />
                </Box>

                {/* 2. Details Skeleton */}
                <Stack flex="1" gap="3">
                    <Flex justify="space-between" align="center">
                        <HStack gap="2">
                            {/* Status Badge */}
                            <Skeleton h="20px" w="80px" rounded="full" />
                            {/* Booking ID */}
                            <Skeleton h="12px" w="60px" />
                        </HStack>

                        {/* Price Tag */}
                        <Skeleton h="28px" w="70px" />
                    </Flex>

                    {/* Car Name Title */}
                    <Skeleton h="24px" w="40%" />

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                        {/* Calendar Info */}
                        <HStack>
                            <SkeletonCircle size="14px" />
                            <Skeleton h="12px" w="120px" />
                        </HStack>

                        {/* Location Info */}
                        <HStack>
                            <SkeletonCircle size="14px" />
                            <Skeleton h="12px" w="100px" />
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* 3. Actions Skeleton */}
                <Stack direction={{ base: "row", md: "column" }} gap="2" align="center">
                     {/* Manage Button */}
                    <Skeleton h="36px" w={{ base: "full", md: "110px" }} rounded="xl" />
                </Stack>
            </Flex>
        </Box>
    );
};

export default BookingCardSkeleton;