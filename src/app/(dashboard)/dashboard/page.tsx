 
"use client"

import { Heading, Text, Stack, Grid, Box } from "@chakra-ui/react"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardPage() {
    const { user } = useAuth()

    return (
        <Stack gap="6">
            <Box>
                <Heading size="2xl">Welcome back, {user?.name} 👋</Heading>
                <Text color="gray.500">Here is what's happening with your drives today.</Text>
            </Box>

            <Grid templateColumns="repeat(3, 1fr)" gap="6">
                <Box p="6" rounded="2xl" border="1px solid" borderColor="gray.100" bg="white" shadow="sm">
                    <Text fontWeight="bold" color="gray.500" fontSize="sm">Total Bookings</Text>
                    <Text fontSize="3xl" fontWeight="black">12</Text>
                </Box>
                {/* Add more stats cards here */}
            </Grid>
        </Stack>
    )
}