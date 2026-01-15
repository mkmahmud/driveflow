"use client"

import { Flex, Box, Text, Button, Link as ChakraLink, HStack, IconButton, VStack } from "@chakra-ui/react"
// Update your imports in Navbar.tsx
import {
    DrawerRoot,
    DrawerBackdrop,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerCloseTrigger
} from "@/components/ui/drawer"// Ensure you have the Chakra v3 Drawer snippet
import { Menu } from "lucide-react"
import NextLink from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const NavLinks = () => (
        <>
            <ChakraLink asChild variant="plain" fontWeight="medium">
                <NextLink href="/">Home</NextLink>
            </ChakraLink>
            <ChakraLink asChild variant="plain" fontWeight="medium">
                <NextLink href="/browse">Browse Cars</NextLink>
            </ChakraLink>
        </>
    )

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            py="4"
            px="4"
            borderBottomWidth="1px"
            bg="white"
        >
            {/* Left Side: Logo & Name */}
            <HStack gap="2" asChild cursor="pointer">
                <NextLink href="/">
                    <Box color="primary" p="2" borderRadius="md" bg="primary/10">
                        <Image src="/logo.png" alt="DriveFlow Logo" width={32} height={32} />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                        DriveFlow
                    </Text>
                </NextLink>
            </HStack>

            {/* Center/Right: Desktop Links */}
            <HStack gap="8" display={{ base: "none", md: "flex" }}>
                <NavLinks />
                <Button colorPalette="teal" variant="solid" rounded="full" px="6">
                    Sign In
                </Button>
            </HStack>

            {/* Mobile Side: Hamburger Menu */}
            <Box display={{ base: "block", md: "none" }}>
                <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <DrawerTrigger asChild>
                        <IconButton variant="ghost" aria-label="Open Menu">
                            <Menu />
                        </IconButton>
                    </DrawerTrigger>
                    <DrawerBackdrop />
                    <DrawerContent roundedLeft="xl">
                        <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                            <VStack align="start" gap="6" mt="4">
                                <NavLinks />
                                <Button w="full" colorPalette="teal">Sign In</Button>
                            </VStack>
                        </DrawerBody>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerRoot>
            </Box>
        </Flex>
    )
}