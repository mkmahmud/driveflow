"use client"

import { Box, Flex, Spinner, Center } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/dashboardHeader"
import Loading from "../loading"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) router.push("/")
  }, [user, isLoading, router])

  if (isLoading) return (
    <Center h="100vh" bg="gray.50">
     <Loading />
    </Center>
  )

  if (!user) return null

  return (
    <Flex h="100vh" overflow="hidden" bg="gray.50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        flex="1"
        overflowY="auto" 
        transition="margin-left 0.3s ease"
      >
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <Box p={{ base: "4", md: "6", lg: "8" }} w="100%" minH="calc(100vh - 64px)">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}