"use client"

import { 
  Box, Text, HStack, IconButton, BreadcrumbRoot, BreadcrumbItem, 
  BreadcrumbLink, BreadcrumbSeparator, Flex, Avatar, Badge 
} from "@chakra-ui/react"
import { Home, Bell, HelpCircle, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useAuth()

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(segment => segment)
    const breadcrumbs = segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return { href, label }
    })
    return [{ href: '/', label: 'Home' }, ...breadcrumbs]
  }

  const breadcrumbs = getBreadcrumbs()
  const pageTitle = pathname === '/dashboard'
    ? 'Dashboard Overview'
    : breadcrumbs.pop()?.label || 'Dashboard'

  return (
    <Box
      as="nav"
      h="16"
      bg="white/80"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="gray.100"
      px={{ base: "4", md: "8" }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      {/* LEFT: Title & Breadcrumbs */}
      <HStack gap="4">
        {/* Mobile Menu Toggle - Only visible on small screens */}
        <IconButton
          display={{ base: "flex", lg: "none" }}
          variant="ghost"
          aria-label="Toggle Menu"
          size="sm"
        >
          <Menu size={20} />
        </IconButton>

        <Box>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="black"
            color="#1E293B"
            lineHeight="1"
          >
            {pageTitle}
          </Text>

          {/* Hide breadcrumbs on very small mobile screens */}
          <Box display={{ base: "none", sm: "block" }} mt="1">
            <BreadcrumbRoot fontSize="xs" color="#64748B">
              {getBreadcrumbs().map((crumb, index, arr) => (
                <BreadcrumbItem key={crumb.href}>
                  <BreadcrumbLink
                    as={Link}
                    href={crumb.href}
                    fontWeight={index === arr.length - 1 ? "semibold" : "normal"}
                    color={index === arr.length - 1 ? "#0D9488" : "#64748B"}
                  >
                    {index === 0 ? <Home size={12} /> : crumb.label}
                  </BreadcrumbLink>
                  {index < arr.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbRoot>
          </Box>
        </Box>
      </HStack>

      {/* RIGHT: Actions & Profile */}
      <HStack gap={{ base: "2", md: "4" }}>
        {/* Hide Help on mobile to save space */}
        <IconButton
          display={{ base: "none", md: "flex" }}
          variant="ghost"
          size="sm"
          color="#64748B"
          _hover={{ color: "#0D9488", bg: "teal.50" }}
        >
          <HelpCircle size={18} />
        </IconButton>

        <IconButton
          variant="ghost"
          size="sm"
          color="#64748B"
          _hover={{ color: "#0D9488", bg: "teal.50" }}
        >
          <Bell size={18} />
        </IconButton>

        <Separator orientation="vertical" h="6" display={{ base: "none", sm: "block" }} />

        {/* User Profile */}
        <Flex align="center" gap="3">
          <Avatar.Root size="sm" bg="#0D9488" color="white" border="2px solid white" shadow="sm">
            <Avatar.Fallback name={user?.name || "U"} />
          </Avatar.Root>
          
          {/* Hide name and email on small mobile devices */}
          <Box display={{ base: "none", lg: "block" }}>
            <Text fontSize="sm" fontWeight="bold" color="#1E293B" lineHeight="1">
              {user?.name}
            </Text>
            <Flex align="center" gap="2" mt="0.5">
              <Badge
                colorPalette={user?.role === 'ADMIN' ? 'red' : user?.role === 'HOST' ? 'blue' : 'teal'}
                variant="subtle"
                size="xs"
                rounded="full"
                px="2"
              >
                {user?.role}
              </Badge>
              <Text fontSize="10px" color="#64748B" maxW="120px" truncate>
                {user?.email}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </HStack>
    </Box>
  )
}

// Simple Separator Helper if not imported
function Separator({ orientation, ...props }: any) {
  return <Box w={orientation === 'vertical' ? '1px' : 'full'} h={orientation === 'vertical' ? 'full' : '1px'} bg="gray.200" {...props} />
}