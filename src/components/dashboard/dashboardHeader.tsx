"use client"

import { Box, Text, HStack, IconButton, BreadcrumbRoot, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Flex, Avatar, Badge } from "@chakra-ui/react"
import { Home, Bell, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardHeader() {
  const pathname = usePathname()

  // GEt User
  const { user, logout } = useAuth()


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

  const pageTitle = pathname === '/dashboard'
    ? 'Dashboard Overview'
    : getBreadcrumbs().pop()?.label || 'Dashboard'

  return (
    <Box
      as="nav"
      h="16"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      px={{ base: "4", md: "8" }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Breadcrumbs and Title */}
      <Box>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="#1E293B"
          mb="1"
        >
          {pageTitle}
        </Text>

        <BreadcrumbRoot fontSize="sm" color="#64748B" > 
          {getBreadcrumbs().map((crumb, index) => (
            <BreadcrumbItem key={crumb.href}>
              <BreadcrumbLink
                as={Link}
                href={crumb.href}
                fontWeight={index === getBreadcrumbs().length - 1 ? "medium" : "normal"}
                color={index === getBreadcrumbs().length - 1 ? "#0D9488" : "#64748B"}
              >
                {index === 0 ? <Home size={14} /> : crumb.label}
              </BreadcrumbLink>
              {index < getBreadcrumbs().length - 1 && (
                <BreadcrumbSeparator />
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbRoot>
      </Box>

      {/* Right Side Actions */}
      <HStack gap="3">
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Notifications"
          color="#64748B"
          _hover={{ color: "#0D9488", bg: "rgba(13, 148, 136, 0.1)" }}
        >
          <Bell size={18} />
        </IconButton>

        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Help"
          color="#64748B"
          _hover={{ color: "#0D9488", bg: "rgba(13, 148, 136, 0.1)" }}
        >
          <HelpCircle size={18} />
        </IconButton>

        {/* User Profile */}
        <Flex align="center" gap="3">
          <Avatar.Root size="sm" bg="#0D9488" color="white">
            <Avatar.Fallback name={user?.name || "User"} />
          </Avatar.Root>
          <Box flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#1E293B">
              {user?.name || "User"}
            </Text>
            <Flex align="center" gap="2">
              <Badge
                colorPalette={
                  user?.role === 'ADMIN' ? 'red' :
                    user?.role === 'HOST' ? 'blue' : 'teal'
                }
                variant="subtle"
                size="sm"
                rounded="full"
              >
                {user?.role?.toUpperCase() || 'USER'}
              </Badge>
              <Text fontSize="xs" color="#64748B">
                {user?.email}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </HStack>
    </Box>
  )
}