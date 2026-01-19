"use client"

import {
    Box,
    Text,
    Flex,
    Stack,
    IconButton,
    Button,
    HStack,
    Avatar,
    Badge
} from "@chakra-ui/react"
import {
    LayoutDashboard,
    Calendar,
    Car,
    DollarSign,
    Settings,
    Users,
    CreditCard,
    BarChart3,
    List,
    Plus,
    Tag,
    User,
    UserCheck,
    ChevronDown,
    ChevronRight,
    Menu,
    X
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { SIDEBAR_LINKS, SidebarLink } from "@/lib/sidebar-links"
import Image from "next/image"
import NextLink from "next/link"

const iconMap: Record<string, any> = {
    LayoutDashboard,
    Calendar,
    Car,
    DollarSign,
    Settings,
    Users,
    CreditCard,
    BarChart3,
    List,
    Plus,
    Tag,
    User,
    UserCheck
}

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    const [expandedItems, setExpandedItems] = useState<string[]>([])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleExpand = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }

    const isLinkActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === href
        }
        return pathname.startsWith(href)
    }

    const filteredLinks = SIDEBAR_LINKS.filter(link =>
        link.roles.includes(user?.role || 'user')
    )

    const renderLink = (link: SidebarLink, level = 0) => {
        const Icon = iconMap[link.icon]
        const isActive = isLinkActive(link.href)
        const hasChildren = link.children && link.children.length > 0
        const isExpanded = expandedItems.includes(link.id)

        return (
            <Box key={link.id}>
                <Flex
                    as="button"
                    onClick={() => {
                        if (hasChildren) {
                            toggleExpand(link.id)
                        } else {
                            router.push(link.href)
                            setMobileOpen(false)
                        }
                    }}
                    align="center"
                    justify="space-between"
                    w="full"
                    p="3"
                    pl={level > 0 ? `${level * 24 + 12}px` : "12px"}
                    rounded="lg"
                    mb="1"
                    bg={isActive ? "rgba(13, 148, 136, 0.1)" : "transparent"}
                    color={isActive ? "#0D9488" : "#64748B"}
                    fontWeight={isActive ? "semibold" : "medium"}
                    _hover={{
                        bg: "rgba(13, 148, 136, 0.05)",
                        color: "#0D9488"
                    }}
                    cursor={"pointer"}
                    transition="all 0.2s"
                >
                    <HStack gap="3">
                        {Icon && <Icon size={18} />}
                        <Text fontSize="sm">{link.label}</Text>
                    </HStack>
                    {hasChildren && (
                        <Box color="#94A3B8">
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </Box>
                    )}
                </Flex>

                {hasChildren && isExpanded && (
                    <Box ml={level > 0 ? `${level * 24}px` : "0"}>
                        {link.children
                            ?.filter(child => child.roles.includes(user?.role || 'user'))
                            .map(child => renderLink(child, level + 1))}
                    </Box>
                )}
            </Box>
        )
    }

    if (!mounted) return null

    return (
        <>
            {/* Mobile Menu Button */}
            <Box
                display={{ base: "block", lg: "none" }}
                position="fixed"
                top="4"
                left="4"
                zIndex="10001"
            >
                <IconButton
                    aria-label="Toggle menu"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="lg"
                    shadow="md"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </IconButton>
            </Box>

            {/* Sidebar Overlay for Mobile */}
            {mobileOpen && (
                <Box
                    position="fixed"
                    inset="0"
                    bg="blackAlpha.600"
                    zIndex="1000"
                    onClick={() => setMobileOpen(false)}
                    display={{ base: "block", lg: "none" }}
                />
            )}

            {/* Sidebar */}
            <Box
                position={{ base: "fixed", lg: "sticky" }}
                top="0"
                left="0"
                h={{ base: "100vh", lg: "100vh" }}
                w={{ base: "280px", lg: "280px" }}
                bg="white"
                borderRight="1px solid"
                borderColor="gray.200"
                zIndex="1001"
                transform={{
                    base: mobileOpen ? "translateX(0)" : "translateX(-100%)",
                    lg: "translateX(0)"
                }}
                transition="transform 0.3s ease"
            >
                {/* Logo & User Info */}
                <Box p="6" borderBottom="1px solid" borderColor="gray.100">
                    <NextLink href="/" >
                        <HStack direction="row" align="center"   gap="2"  > 

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
                        </HStack>
                    </NextLink>

                    
                </Box>

                {/* Navigation Links */}
                <Box flex="1" overflowY="auto" p="4"  >
                    <Stack gap="1"  >
                        {filteredLinks.map(link => renderLink(link))}
                    </Stack>
                </Box>

                {/* Logout Section */}
                <Box p="6" borderTop="1px solid" borderColor="gray.100">
                    <Button
                        onClick={logout}
                        w="full"
                        variant="outline"
                        size="sm"
                        color="#64748B"
                        borderColor="gray.200"
                        _hover={{
                            bg: "rgba(239, 68, 68, 0.1)",
                            color: "#DC2626",
                            borderColor: "#DC2626"
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>
        </>
    )
}