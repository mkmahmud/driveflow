"use client"

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Link as ChakraLink,
    HStack,
    IconButton,
    Separator
} from "@chakra-ui/react"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"
import Image from "next/image"
import NextLink from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <Box bg="gray.50" color="gray.700" mt="20" borderTopWidth="1px">
            <Container maxW="breakpoint-xl" py="10">
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="8">

                    {/* Column 1: Logo & Contact */}
                    <Stack gap="4">
                        <HStack gap="2">
                            <Box color="white" p="1.5" borderRadius="md" bg="primary">
                                <Image src="/logo.png" alt="DriveFlow Logo" width={32} height={32} />
                            </Box>
                            <Text fontSize="xl" fontWeight="bold">DriveFlow</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                            The premium car rental experience. Drive your dreams today.
                        </Text>
                        <Stack gap="2" fontSize="sm">
                            <HStack gap="2"><Phone size={16} /> <Text>+1 (555) 000-1234</Text></HStack>
                            <HStack gap="2"><Mail size={16} /> <Text>support@driveflow.com</Text></HStack>
                        </Stack>
                        <HStack gap="4">
                            <IconButton variant="ghost" size="sm" aria-label="Facebook"><Facebook size={18} /></IconButton>
                            <IconButton variant="ghost" size="sm" aria-label="Instagram"><Instagram size={18} /></IconButton>
                            <IconButton variant="ghost" size="sm" aria-label="Twitter"><Twitter size={18} /></IconButton>
                        </HStack>
                    </Stack>

                    {/* Column 2: Quick Links */}
                    <Stack gap="4">
                        <Text fontWeight="bold">Company</Text>
                        <VStack align="start" gap="2" fontSize="sm">
                            <ChakraLink asChild variant="plain"><NextLink href="/about">About Us</NextLink></ChakraLink>
                            <ChakraLink asChild variant="plain"><NextLink href="/careers">Careers</NextLink></ChakraLink>
                            <ChakraLink asChild variant="plain"><NextLink href="/blog">Blog</NextLink></ChakraLink>
                        </VStack>
                    </Stack>

                    {/* Column 3: Support */}
                    <Stack gap="4">
                        <Text fontWeight="bold">Support</Text>
                        <VStack align="start" gap="2" fontSize="sm">
                            <ChakraLink asChild variant="plain"><NextLink href="/help">Help Center</NextLink></ChakraLink>
                            <ChakraLink asChild variant="plain"><NextLink href="/safety">Safety Information</NextLink></ChakraLink>
                            <ChakraLink asChild variant="plain"><NextLink href="/terms">Terms of Service</NextLink></ChakraLink>
                        </VStack>
                    </Stack>

                    {/* Column 4: Popular Cities */}
                    <Stack gap="4">
                        <Text fontWeight="bold">Locations</Text>
                        <VStack align="start" gap="2" fontSize="sm">
                            <Text>New York</Text>
                            <Text>Los Angeles</Text>
                            <Text>Miami</Text>
                            <Text>Chicago</Text>
                        </VStack>
                    </Stack>

                </SimpleGrid>

                <Separator mt="10" mb="6" />

                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    gap="4"
                    fontSize="xs"
                    color="gray.500"
                >
                    <Text>© {currentYear} DriveFlow Inc. All rights reserved.</Text>
                    <HStack gap="6">
                        <NextLink href="/privacy">Privacy Policy</NextLink>
                        <NextLink href="/cookies">Cookie Settings</NextLink>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}

// Helper component for stacking links
function VStack({ children, align, gap, ...props }: any) {
    return <Stack direction="column" align={align} gap={gap} {...props}>{children}</Stack>
}