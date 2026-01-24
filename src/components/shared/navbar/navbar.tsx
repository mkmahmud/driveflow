"use client"

import { Flex, Box, Text, Button, Link as ChakraLink, HStack, IconButton, VStack, MenuRoot, MenuTrigger, Avatar, MenuContent, MenuItem } from "@chakra-ui/react"
import {
    DrawerRoot,
    DrawerBackdrop,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerCloseTrigger
} from "@/components/ui/drawer"
import { LogOut, Menu, UserIcon, Car, Sparkles } from "lucide-react"
import NextLink from "next/link"
import { useState } from "react"
import Image from "next/image"
import AuthModal from "@/components/auth/authModal"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const { user, logout, isLoading } = useAuth();

    // Nav links
    const NavLinks = () => (
        <>
            <ChakraLink asChild variant="plain" fontWeight="medium">
                <NextLink href="/dashboard/host/add-new-car" >
                    <HStack _hover={{ color: "primary" }} gap="1" px="3" outline="none" py="2" borderRadius="lg" >
                        <Car size={16} color="black" />
                        <Text color="black">List your Cars</Text>
                    </HStack>
                </NextLink>
            </ChakraLink>
        </>
    )

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            py="3"
            px={{ base: "4", md: "8", lg: "12" }}
            borderBottomWidth="1px"
            borderColor="gray.100"
            bg="white"
            position="sticky"
            top="0"
            zIndex="1000"
            backdropFilter="blur(10px)"
            backgroundColor="rgba(255, 255, 255, 0.9)"
        >
            {/* Logo */}
            <HStack gap="2" asChild cursor="pointer">
                <NextLink href="/">
                    <Box
                        position="relative"

                        borderRadius="xl"

                        transition="all 0.3s ease"

                    >
                        <Box position="relative" zIndex="1">
                            <Image
                                src="/logo.png"
                                alt="DriveFlow Logo"
                                width={50}
                                height={50}
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

                        >
                            DriveFlow
                        </Text>

                    </Box>
                </NextLink>
            </HStack>

            {/* Desktop Navigation */}
            <HStack gap="8" display={{ base: "none", md: "flex" }}>
                <NavLinks />

                {!isLoading && user ? (
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <HStack
                                cursor="pointer"
                                gap="3"
                                px="3"
                                py="1.5"
                                borderRadius="full"
                                bg="gray.50"
                                _hover={{ bg: "gray.100" }}
                                transition="all 0.2s"
                            >
                                <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                                    {user.name}
                                </Text>
                                <Avatar.Root
                                    size="sm"
                                    borderRadius="full"
                                    border="2px solid"
                                    borderColor="primary.500"
                                    boxShadow="0 0 0 2px rgba(0, 168, 168, 0.1)"
                                >
                                    <Avatar.Fallback
                                        name={user.name || ""}
                                        bgGradient="linear(to-br, primary.500, teal.400)"
                                        color="white"
                                    />
                                </Avatar.Root>
                            </HStack>
                        </MenuTrigger>
                        <MenuContent
                            minW="200px"
                            boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor="gray.200"
                            position="absolute"
                            right="10"
                            top="14"
                        >
                            <MenuItem
                                value="profile"
                                gap="2"
                                py="3"
                                _hover={{ bg: "primary.50" }}
                            >
                                <UserIcon size={16} />
                                <Text fontWeight="medium"> <Link href="/dashboard">Profile</Link> </Text>
                            </MenuItem>
                            <MenuItem
                                value="logout"
                                color="red.500"
                                gap="2"
                                py="3"
                                _hover={{ bg: "red.50" }}
                                onClick={logout}
                            >
                                <LogOut size={16} />
                                <Text fontWeight="medium">Logout</Text>
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                ) : (
                    <Button
                        disabled={isLoading}
                        colorPalette="teal"
                        variant="solid"
                        rounded="full"
                        px="6"
                        py="5"
                        fontWeight="semibold"
                        boxShadow="0 4px 15px rgba(0, 168, 168, 0.3)"
                        _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(0, 168, 168, 0.4)"
                        }}
                        transition="all 0.3s ease"
                        onClick={() => setIsAuthOpen(true)}
                    >
                        <Sparkles size={16} style={{ marginRight: "8px" }} />
                        Sign In
                    </Button>
                )}
            </HStack>

            {/* Mobile Menu */}
            <Box display={{ base: "block", md: "none" }}>
                <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <DrawerTrigger asChild>
                        <IconButton
                            aria-label="Open Menu"
                            size="lg"
                            borderRadius="lg"
                            _hover={{ bg: "primary.50" }}
                        >
                            <Menu size={24} />
                        </IconButton>
                    </DrawerTrigger>
                    <DrawerBackdrop />
                    <DrawerContent
                        roundedLeft="3xl"
                        maxW="320px"
                        boxShadow="-20px 0 40px rgba(0, 0, 0, 0.1)"
                        bg="white"
                    >
                        <DrawerHeader
                            borderBottomWidth="1px"
                            pb="4"
                            bgGradient="linear(to-r, primary.500, teal.400)"
                        >
                            <DrawerTitle color="black" fontSize="xl">
                                <HStack>
                                    <Sparkles size={20} />
                                    <Text>DriveFlow Menu</Text>
                                </HStack>
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody py="6">
                            <VStack align="start" gap="4" mt="4">
                                <NavLinks />
                                {!isLoading && user ? (
                                    <MenuRoot >
                                        <Box position="relative">
                                            <MenuTrigger asChild>
                                                <HStack
                                                    cursor="pointer"
                                                    gap="3"
                                                    px="3"
                                                    py="1.5"
                                                    borderRadius="full"
                                                    bg="gray.50"
                                                    _hover={{ bg: "gray.100" }}
                                                    transition="all 0.2s"
                                                >
                                                    <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                                                        {user.name}
                                                    </Text>
                                                    <Avatar.Root
                                                        size="sm"
                                                        borderRadius="full"
                                                        border="2px solid"
                                                        borderColor="primary.500"
                                                        boxShadow="0 0 0 2px rgba(0, 168, 168, 0.1)"
                                                    >
                                                        <Avatar.Fallback
                                                            name={user.name || ""}
                                                            bgGradient="linear(to-br, primary.500, teal.400)"
                                                            color="white"
                                                        />
                                                    </Avatar.Root>
                                                </HStack>
                                            </MenuTrigger>
                                            <MenuContent
                                                minW="200px"
                                                boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
                                                borderRadius="xl"
                                                borderWidth="1px"
                                                borderColor="gray.200"
                                                position="absolute"
                                                left="0"
                                                top="14"
                                            >
                                                <MenuItem
                                                    value="profile"
                                                    gap="2"
                                                    py="3"
                                                    _hover={{ bg: "primary.50" }}
                                                >
                                                    <UserIcon size={16} />
                                                    <Text fontWeight="medium"> <Link href="/dashboard">Profile</Link> </Text>
                                                </MenuItem>
                                                <MenuItem
                                                    value="logout"
                                                    color="red.500"
                                                    gap="2"
                                                    py="3"
                                                    _hover={{ bg: "red.50" }}
                                                    onClick={logout}
                                                >
                                                    <LogOut size={16} />
                                                    <Text fontWeight="medium">Logout</Text>
                                                </MenuItem>
                                            </MenuContent>
                                        </Box>
                                    </MenuRoot>
                                ) : (
                                    <Button
                                        disabled={isLoading}
                                        colorPalette="teal"
                                        variant="solid"
                                        rounded="full"
                                        px="6"
                                        py="5"
                                        fontWeight="semibold"
                                        boxShadow="0 4px 15px rgba(0, 168, 168, 0.3)"
                                        _hover={{
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 6px 20px rgba(0, 168, 168, 0.4)"
                                        }}
                                        transition="all 0.3s ease"
                                        onClick={() => setIsAuthOpen(true)}
                                    >
                                        <Sparkles size={16} style={{ marginRight: "8px" }} />
                                        Sign In
                                    </Button>
                                )}
                            </VStack>
                        </DrawerBody>
                        <DrawerCloseTrigger
                            position="absolute"
                            top="4"
                            right="4"
                            color="white"
                        />
                    </DrawerContent>
                </DrawerRoot>
            </Box>

            {/* The Modal */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </Flex>
    )
}