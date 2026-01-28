"use client"

import { Button, HStack, Text, Flex, Box, IconButton } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalCount?: number
    onPageChange: (page: number) => void
    isLoading?: boolean
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    isLoading,
}: PaginationProps) => {

    const getPages = () => {
        const pages: (number | string)[] = []
        const range = 1
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...")
            }
        }
        return pages
    }

    if (totalPages <= 1) return null

    return (
        <Flex direction="column" align="center" w="full" py="8">
            <HStack
                bg="white"
                px="2"
                py="2"
                borderRadius="full"
                gap="1"
                boxShadow="0 4px 20px -5px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)"
                border="1px solid"
                borderColor="gray.100"
            >
                {/* Prev Icon */}
                <IconButton
                    aria-label="Previous"
                    rounded="full"
                    h="10"
                    w="10"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    _hover={{ bg: "gray.50" }}
                >
                    <ChevronLeft size={20} />
                </IconButton>

                {/* Page Numbers Track */}
                <HStack gap="1">
                    {getPages().map((page, index) => (
                        <Box key={index} position="relative">
                            {page === "..." ? (
                                <Text px="2" color="gray.300" fontWeight="bold">•••</Text>
                            ) : (
                                <Button
                                    size="sm"
                                    minW="10"
                                    h="10"
                                    variant="ghost"
                                    color={currentPage === page ? "white" : "gray.500"}
                                    bg={currentPage === page ? "teal.600" : "transparent"}
                                    rounded="full"
                                    fontWeight="bold"
                                    fontSize="sm"
                                    onClick={() => onPageChange(page as number)}
                                    _hover={currentPage === page ? { bg: "teal.700" } : { bg: "gray.50", color: "teal.600" }}
                                    position="relative"
                                    zIndex="2"
                                    transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                                    _active={{ transform: "scale(0.95)" }}
                                >
                                    {page}
                                </Button>
                            )}

                            {/* Background Glow for Active Page */}
                            {currentPage === page && (
                                <Box
                                    position="absolute"
                                    inset="0"
                                    bg="teal.400"
                                    filter="blur(10px)"
                                    opacity="0.3"
                                    zIndex="1"
                                />
                            )}
                        </Box>
                    ))}
                </HStack>

                {/* Next Icon */}
                <IconButton
                    aria-label="Next"

                    rounded="full"
                    h="10"
                    w="10"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    loading={isLoading}
                    _hover={{ bg: "gray.50" }}
                >
                    <ChevronRight size={20} />
                </IconButton>
            </HStack>

            {/* Floating Meta Text */}
            <HStack mt="4" gap="3" opacity="0.6">
                <Box h="1px" w="20px" bg="gray.300" />
                <Text fontSize="10px" fontWeight="black" color="gray.500" letterSpacing="0.2em" textTransform="uppercase">
                    {currentPage} / {totalPages} Pages
                </Text>
                <Box h="1px" w="20px" bg="gray.300" />
            </HStack>
        </Flex>
    )
}