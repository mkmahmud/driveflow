"use client"

import { Center, Spinner, VStack, Text, Box } from "@chakra-ui/react"
import { Car } from "lucide-react"

export default function Loading() {
    return (
        <Center h="70vh" w="full">
            <VStack gap="6">
                <Box position="relative" w="68px" h="68px">
                    {/* Animated Car Icon */}
                    <Center
                        position="absolute"
                        inset="0"
                        color="primary"
                        animation="bounce 1s infinite"
                        zIndex="1"
                    >
                        <Car size={32} />
                    </Center>

                    {/* Corrected Spinner for v3 */}
                    <Spinner
                        borderWidth="4px"           /* Replaces thickness */
                        borderTopColor="primary"    /* The spinning part */
                        borderColor="gray.200"      /* Replaces emptyColor */
                        size="xl"
                        position="absolute"
                        inset="-2px"                /* Centers it around the car */
                        w="full"
                        h="full"
                    />
                </Box>

                <VStack gap="1">
                    <Text fontWeight="bold" fontSize="xl">Loading DriveFlow...</Text>
                    <Text color="gray.500">Finding the perfect ride for you.</Text>
                </VStack>
            </VStack>

            <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
        </Center>
    )
}