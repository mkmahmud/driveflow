"use client"
import { useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { trpc } from "@/trpc/client"
import { Box, Heading, Text, Spinner, Center, VStack } from "@chakra-ui/react"

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const router = useRouter()
    
    // Use a ref to prevent double-mutation in React Strict Mode
    const hasCalled = useRef(false);

    const confirm = trpc.booking.finalizeStripeBooking.useMutation({
        onSuccess: () => {
            localStorage.removeItem("pendingBooking")
            // Redirect to dashboard or bookings list after 3 seconds
            setTimeout(() => {
                router.push("/bookings") 
            }, 3000)
        },
        onError: (err) => {
            console.error("DB Update Failed:", err)
        }
    })

    useEffect(() => {
        if (sessionId && !hasCalled.current) {
            hasCalled.current = true;
            confirm.mutate({ sessionId })
        }
    }, [sessionId])

    return (
        <Center minH="60vh">
            <VStack gap="6">
                {confirm.isPending ? (
                    <>
                        <Spinner size="xl" color="teal.500" />
                        <Heading size="lg">Verifying Payment...</Heading>
                        <Text>Please do not close this window.</Text>
                    </>
                ) : confirm.isSuccess ? (
                    <>
                        <Box color="green.500" fontSize="6xl">✔</Box>
                        <Heading>Booking Confirmed!</Heading>
                        <Text>Your database has been updated. Redirecting...</Text>
                    </>
                ) : (
                    <>
                        <Box color="red.500" fontSize="6xl">✘</Box>
                        <Heading>Something went wrong</Heading>
                        <Text>{confirm.error?.message || "Failed to save booking to database."}</Text>
                    </>
                )}
            </VStack>
        </Center>
    )
}