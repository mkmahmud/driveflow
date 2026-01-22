import {
    Box,
    Flex,
    Stack,
    Skeleton,
    SkeletonText,
    HStack,
    SimpleGrid,
    Separator,
} from "@chakra-ui/react";

const BookingCardSkeleton = () => {
    return (
        <Box
            bg="white"
            rounded="3xl"
            p="5"
            border="1px solid"
            borderColor="gray.100"
            shadow="sm"
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                gap="6"
                align={{ base: "stretch", md: "center" }}
            >
                {/* Image Skeleton */}
                <Skeleton
                    w={{ base: "full", md: "200px" }}
                    h="120px"
                    rounded="2xl"
                />

                {/* Details Skeleton */}
                <Stack flex="1" gap="3">
                    <Flex justify="space-between" align="center">
                        <HStack gap="2">
                            <Skeleton h="20px" w="80px" rounded="full" />
                            <Skeleton h="12px" w="60px" />
                        </HStack>
                        <Skeleton h="24px" w="70px" />
                    </Flex>

                    <Skeleton h="22px" w="60%" />

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                        <HStack>
                            <Skeleton h="14px" w="14px" rounded="full" />
                            <Skeleton h="12px" w="140px" />
                        </HStack>
                        <HStack>
                            <Skeleton h="14px" w="14px" rounded="full" />
                            <Skeleton h="12px" w="100px" />
                        </HStack>
                    </SimpleGrid>
                </Stack>

                {/* Actions Separator */}
                <Separator
                    orientation="vertical"
                    h="80px"
                    display={{ base: "none", md: "block" }}
                />

                {/* Actions Skeleton */}
                <Stack direction={{ base: "row", md: "column" }} gap="2">
                    <Skeleton h="32px" w="90px" rounded="xl" />
                    <Skeleton h="32px" w="110px" rounded="xl" />
                </Stack>
            </Flex>
        </Box>
    );
};

export default BookingCardSkeleton;
