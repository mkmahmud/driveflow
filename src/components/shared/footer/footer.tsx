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
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight } from "lucide-react"
import Image from "next/image"
import NextLink from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <Box bg="white" color="gray.700" borderTop="1px solid" borderColor="gray.200">
            <Container maxW="7xl" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "12", md: "16" }}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={{ base: "8", md: "12" }} mb={{ base: "10", md: "16" }}>

                    {/* Column 1: Logo & Contact */}
                    <Stack gap="6">
                        <HStack gap="3">
                            <Box
                                position="relative"
                                p="2"
                                borderRadius="xl" 
                            >
                                <Box position="relative" zIndex="1">
                                    <Image 
                                        src="/logo.png" 
                                        alt="DriveFlow Logo" 
                                        width={32} 
                                        height={32} 
                                    />
                                </Box>
                                <Box
                                    position="absolute"
                                    inset="0"
                                    borderRadius="inherit"
                                    bgGradient="linear(to-br, transparent, rgba(255,255,255,0.2))"
                                />
                            </Box>
                            <Box>
                                <Text 
                                    fontSize="2xl" 
                                    fontWeight="bold" 
                                    letterSpacing="tight"
                                    color="black"
                                >
                                    DriveFlow
                                </Text>
                                
                            </Box>
                        </HStack>
                        <Text fontSize="sm" color="#64748B" lineHeight="1.6">
                            Experience premium comfort and reliability with our curated fleet. 
                            Book your ideal vehicle quickly and easily.
                        </Text>
                        <Stack gap="3" fontSize="sm">
                            <HStack gap="3">
                                <Box
                                    p="2"
                                    rounded="lg"
                                    bg="rgba(13, 148, 136, 0.1)"
                                    border="1px solid"
                                    borderColor="rgba(13, 148, 136, 0.2)"
                                >
                                    <Phone size={16} color="#0D9488" />
                                </Box>
                                <Stack gap="0">
                                    <Text fontWeight="semibold" color="#1E293B">Call Us</Text>
                                    <Text color="#64748B">+1 (555) 000-1234</Text>
                                </Stack>
                            </HStack>
                            <HStack gap="3">
                                <Box
                                    p="2"
                                    rounded="lg"
                                    bg="rgba(13, 148, 136, 0.1)"
                                    border="1px solid"
                                    borderColor="rgba(13, 148, 136, 0.2)"
                                >
                                    <Mail size={16} color="#0D9488" />
                                </Box>
                                <Stack gap="0">
                                    <Text fontWeight="semibold" color="#1E293B">Email Us</Text>
                                    <Text color="#64748B">support@driveflow.com</Text>
                                </Stack>
                            </HStack>
                        </Stack>
                    </Stack>

                    {/* Column 2: Quick Links */}
                    <Stack gap="4">
                        <Text 
                            fontWeight="bold" 
                            fontSize="lg" 
                            color="#1E293B"
                            letterSpacing="tight"
                        >
                            Quick Links
                        </Text>
                        <Stack gap="3">
                            {[
                                { href: "/browse", label: "Browse Cars" },
                                { href: "/how-it-works", label: "How It Works" },
                                { href: "/about", label: "About Us" },
                                { href: "/careers", label: "Careers" },
                                { href: "/blog", label: "Blog" }
                            ].map((link, index) => (
                                <HStack key={index} gap="2">
                                    <ChevronRight size={12} color="#0D9488" />
                                    <ChakraLink 
                                        asChild 
                                        href={link.href}
                                        color="#64748B"
                                        fontWeight="medium"
                                        fontSize="sm"
                                        _hover={{ color: "#0D9488" }}
                                        transition="color 0.2s"
                                    >
                                        <NextLink href={link.href}>
                                            {link.label}
                                        </NextLink>
                                    </ChakraLink>
                                </HStack>
                            ))}
                        </Stack>
                    </Stack>

                    {/* Column 3: Support */}
                    <Stack gap="4">
                        <Text 
                            fontWeight="bold" 
                            fontSize="lg" 
                            color="#1E293B"
                            letterSpacing="tight"
                        >
                            Support
                        </Text>
                        <Stack gap="3">
                            {[
                                { href: "/help", label: "Help Center" },
                                { href: "/safety", label: "Safety Information" },
                                { href: "/terms", label: "Terms of Service" },
                                { href: "/privacy", label: "Privacy Policy" },
                                { href: "/faq", label: "FAQ" }
                            ].map((link, index) => (
                                <HStack key={index} gap="2">
                                    <ChevronRight size={12} color="#0D9488" />
                                    <ChakraLink 
                                        asChild 
                                        href={link.href}
                                        color="#64748B"
                                        fontWeight="medium"
                                        fontSize="sm"
                                        _hover={{ color: "#0D9488" }}
                                        transition="color 0.2s"
                                    >
                                        <NextLink href={link.href}>
                                            {link.label}
                                        </NextLink>
                                    </ChakraLink>
                                </HStack>
                            ))}
                        </Stack>
                    </Stack>

                    {/* Column 4: Popular Cities */}
                    <Stack gap="4">
                        <Text 
                            fontWeight="bold" 
                            fontSize="lg" 
                            color="#1E293B"
                            letterSpacing="tight"
                        >
                            Popular Cities
                        </Text>
                        <Stack gap="3">
                            {[
                                { name: "New York" },
                                { name: "Los Angeles" },
                                { name: "Miami" },
                                { name: "Chicago" },
                                { name: "San Francisco" },
                                { name: "Seattle" }
                            ].map((city, index) => (
                                <HStack key={index} gap="2">
                                    <Box
                                        p="1.5"
                                        rounded="md"
                                        bg="rgba(13, 148, 136, 0.1)"
                                    >
                                        <MapPin size={12} color="#0D9488" />
                                    </Box>
                                    <Text 
                                        color="#64748B"
                                        fontWeight="medium"
                                        fontSize="sm"
                                    >
                                        {city.name}
                                    </Text>
                                </HStack>
                            ))}
                        </Stack>
                    </Stack>

                </SimpleGrid>

                {/* Social Media */}
                <Box mb={{ base: "8", md: "10" }}>
                    <Separator mb="6" />
                    <Flex 
                        direction={{ base: "column", md: "row" }}
                        justify="space-between" 
                        align="center"
                        gap={{ base: "6", md: "0" }}
                    >
                        <Text 
                            fontWeight="semibold" 
                            color="#1E293B"
                            fontSize="sm"
                        >
                            Connect with us
                        </Text>
                        <HStack gap="3">
                            <IconButton
                                variant="outline"
                                size="sm"
                                aria-label="Facebook"
                                borderColor="gray.300"
                                color="#64748B"
                                _hover={{
                                    bg: "#0D9488",
                                    color: "white",
                                    borderColor: "#0D9488",
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.2s ease"
                            >
                                <Facebook size={16} />
                            </IconButton>
                            <IconButton
                                variant="outline"
                                size="sm"
                                aria-label="Instagram"
                                borderColor="gray.300"
                                color="#64748B"
                                _hover={{
                                    bg: "#0D9488",
                                    color: "white",
                                    borderColor: "#0D9488",
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.2s ease"
                            >
                                <Instagram size={16} />
                            </IconButton>
                            <IconButton
                                variant="outline"
                                size="sm"
                                aria-label="Twitter"
                                borderColor="gray.300"
                                color="#64748B"
                                _hover={{
                                    bg: "#0D9488",
                                    color: "white",
                                    borderColor: "#0D9488",
                                    transform: "translateY(-2px)"
                                }}
                                transition="all 0.2s ease"
                            >
                                <Twitter size={16} />
                            </IconButton>
                        </HStack>
                    </Flex>
                </Box>

                {/* Bottom Bar */}
                <Box
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="xl"
                    p={{ base: "6", md: "8" }}
                >
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="space-between"
                        align="center"
                        gap={{ base: "4", md: "0" }}
                        fontSize="sm"
                        color="#64748B"
                    >
                        <Flex 
                            direction={{ base: "column", sm: "row" }}
                            align="center"
                            gap={{ base: "2", sm: "6" }}
                        >
                            <Text fontWeight="medium">© {currentYear} DriveFlow Inc. All rights reserved.</Text>
                            <HStack gap="6">
                                <ChakraLink 
                                    asChild 
                                    href="/privacy"
                                    color="#64748B"
                                    _hover={{ color: "#0D9488" }}
                                >
                                    <NextLink href="/privacy">
                                        Privacy Policy
                                    </NextLink>
                                </ChakraLink>
                                <ChakraLink 
                                    asChild 
                                    href="/terms"
                                    color="#64748B"
                                    _hover={{ color: "#0D9488" }}
                                >
                                    <NextLink href="/terms">
                                        Terms of Service
                                    </NextLink>
                                </ChakraLink>
                                <ChakraLink 
                                    asChild 
                                    href="/cookies"
                                    color="#64748B"
                                    _hover={{ color: "#0D9488" }}
                                >
                                    <NextLink href="/cookies">
                                        Cookie Settings
                                    </NextLink>
                                </ChakraLink>
                            </HStack>
                        </Flex>
                        
                        <Box
                            px="4"
                            py="1.5"
                            bg="rgba(13, 148, 136, 0.1)"
                            border="1px solid"
                            borderColor="rgba(13, 148, 136, 0.2)"
                            rounded="full"
                            fontSize="xs"
                            fontWeight="semibold"
                            color="#0D9488"
                        >
                            Trusted by 5000+ Customers
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}