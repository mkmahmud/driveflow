"use client"

import { Box, Stack, HStack, Flex, SimpleGrid, Skeleton, SkeletonCircle } from "@chakra-ui/react"

export function CarCardSkeleton() {
    return (
        <Box
            bg="white"
            rounded="3xl"
            borderWidth="1px"
            borderColor="gray.100"
            position="relative"
            overflow="hidden"
        >
            {/* 1. Header Badges Skeleton */}
            <Flex p="5" justify="space-between" align="center" position="absolute" w="full" zIndex="10">
                <Skeleton h="24px" w="70px" rounded="full" />
                <SkeletonCircle size="34px" />
            </Flex>

            {/* 2. Visual Content Skeleton (Image Area) */}
            <Skeleton h="180px" w="full" />

            {/* 3. Card Information Body */}
            <Stack p="6" gap="4">
                <Box>
                    <Flex justify="space-between" align="center">
                        {/* Car Name Title */}
                        <Skeleton h="24px" w="60%" />
                        {/* Rating */}
                        <Skeleton h="18px" w="40px" />
                    </Flex>
                    {/* Subtitle */}
                    <Skeleton h="12px" w="100px" mt="2" />
                </Box>

                {/* Technical Specs Row */}
                <SimpleGrid columns={3} gap="2">
                    {[1, 2, 3].map((i) => (
                        <Stack key={i} gap="2" align="center" p="2" bg="gray.50" rounded="xl">
                            <Skeleton h="16px" w="16px" />
                            <Skeleton h="10px" w="30px" />
                        </Stack>
                    ))}
                </SimpleGrid>

                <Box h="1px" bg="gray.100" />

                {/* 4. Footer: Price & CTA */}
                <Flex justify="space-between" align="center">
                    <Stack gap="1">
                        <Skeleton h="28px" w="60px" />
                        <Skeleton h="10px" w="30px" />
                    </Stack>

                    <Skeleton h="40px" w="90px" rounded="xl" />
                </Flex>
            </Stack>
        </Box>
    )
}