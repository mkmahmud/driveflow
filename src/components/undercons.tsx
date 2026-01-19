"use client"

import {
    Box, Container, Stack, Text, Heading,
    Button, Center, Circle, Flex, Input
} from "@chakra-ui/react"
import {
    Hammer, Timer, ChevronLeft, Bell,
    Construction, HardHat, Sparkles
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function UnderConstruction() {
    const router = useRouter()

    return (
        <Box minH="100vh" bg="gray.50" position="relative" overflow="hidden">
            {/* Background Decorative Elements */}
            <Box
                position="absolute" top="-10%" right="-5%"
                w="500px" h="500px" bg="teal.100/30"
                rounded="full" filter="blur(80px)"
            />
            <Box
                position="absolute" bottom="-10%" left="-5%"
                w="400px" h="400px" bg="teal.50"
                rounded="full" filter="blur(60px)"
            />

            <Container maxW="breakpoint-md" pt="20" pb="10">
                <Center flexDirection="column" textAlign="center">
                    {/* Icon Header */}
                    <Box position="relative" mb="8">
                        <Circle size="120px" bg="white" shadow="xl" border="1px solid" borderColor="teal.100">
                            <Construction size={48} className="text-teal-600" />
                        </Circle>
                        <Box position="absolute" bottom="0" right="0" bg="orange.400" p="2" rounded="lg" shadow="lg">
                            <Timer size={20} color="white" />
                        </Box>
                    </Box>

                    {/* Text Content */}
                    <Stack gap="4" mb="10">
                        <Text
                            fontSize="xs" fontWeight="black" color="teal.600"
                            letterSpacing="widest" textTransform="uppercase"
                        >
                            Feature Development
                        </Text>
                        <Heading size="5xl" fontWeight="900" letterSpacing="tight">
                            We're currently <br />
                            <span className="text-teal-600">Polishing the Engine</span>
                        </Heading>
                        <Text color="gray.500" fontSize="lg" maxW="500px">
                            This section is undergoing a scheduled upgrade to provide you
                            with a seamless experience. We'll be back online shortly.
                        </Text>
                    </Stack>

                    {/* Interactive Notification Card */}
                    <Box
                        bg="white" p="8" rounded="3xl" shadow="2xl"
                        border="1px solid" borderColor="gray.100" w="full" maxW="450px"
                    >
                        <Stack gap="4">
                            <HStack gap="3" justify="center" mb="2">
                                <Sparkles size={18} className="text-orange-400" />
                                <Text fontWeight="bold" fontSize="sm">Get notified when we launch</Text>
                            </HStack>
                            <Flex gap="2">
                                <Input
                                    placeholder="your@email.com"
                                    variant="subtle" rounded="xl" h="12" bg="gray.50"
                                />
                                <Button colorPalette="teal" rounded="xl" px="6" h="12">
                                    <Bell size={18} />
                                </Button>
                            </Flex>
                            <Text fontSize="10px" color="gray.400">
                                No spam. Just a single update when this feature is ready.
                            </Text>
                        </Stack>
                    </Box>

                    {/* Navigation Actions */}
                    <HStack mt="12" gap="6">
                        <Button
                            variant="ghost" gap="2" color="gray.600" fontWeight="bold"
                            onClick={() => router.back()}
                            _hover={{ color: "teal.600" }}
                        >
                            <ChevronLeft size={18} /> Go Back
                        </Button>
                        <Box h="20px" w="1px" bg="gray.300" />
                        <Button
                            variant="ghost" color="gray.600" fontWeight="bold"
                            onClick={() => router.push("/")}
                            _hover={{ color: "teal.600" }}
                        >
                            Visit Homepage
                        </Button>
                    </HStack>
                </Center>
            </Container>
        </Box>
    )
}

// Simple Helper for Horizontal Stack if not imported
function HStack({ children, ...props }: any) {
    return <Flex align="center" {...props}>{children}</Flex>
}