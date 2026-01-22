"use client"

import { useState, useEffect } from "react"
import {
  Box, Container, Stack, Text, Heading, HStack,
  Button, Flex, Input, Icon, Separator, Center, Image, Badge
} from "@chakra-ui/react"
import {
  CreditCard, ShieldCheck, Lock, ChevronLeft,
  ExternalLink, Calendar, Car as CarIcon
} from "lucide-react"
import { RadioGroup, Radio } from "@/components/ui/radio"
import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const [method, setMethod] = useState("card")
  const [booking, setBooking] = useState<any>(null)

  const router = useRouter();

  // Stripe Mutation will go here
  const stripeMutation = trpc.payment.createStripeSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        router.push(data.url); // Redirect user to Stripe
      }
    },
  });

  // Fetch data from localStorage on mount
  useEffect(() => {
    const savedBooking = localStorage.getItem("pendingBooking")
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking))
      console.log("Loaded booking from localStorage:", JSON.parse(savedBooking))
    }
  }, [])

  const handlePayment = () => {
    console.log(`Initiating ${method} payment for total: $${booking?.financials?.totalAmount}`)

    if (method === "stripe") {
      stripeMutation.mutate({ bookingData: booking });
    } else {
      // Handle Card/PayPal...
    }
  }

  return (
    <Box bg="gray.50/50" minH="100vh" py="20">
      <Container maxW="2xl">
        <Stack gap="8">
          {/* Header */}
          <Stack align="center" textAlign="center" gap="2">
            <Center bg="teal.50" color="teal.600" p="4" rounded="2xl" mb="2">
              <ShieldCheck size={32} />
            </Center>
            <Heading size="3xl" fontWeight="900" letterSpacing="tight">Secure Checkout</Heading>
            <Text color="gray.500" fontSize="sm">Review your trip and complete payment</Text>
          </Stack>

          {/* Payment Card */}
          <Box bg="white" p="0" rounded="3xl" border="1px solid" borderColor="gray.100" overflow="hidden"  >

            {/* TOP SUMMARY SECTION */}
            {booking && (
              <Box bg="teal.600" p="6" color="white">
                <Flex justify="space-between" align="center">
                  <HStack gap="4">
                    <Image src={booking.car.image} w="80px" h="50px" objectFit="cover" rounded="lg" border="2px solid" borderColor="white/20" />
                    <Stack gap="0">
                      <Text fontWeight="bold" fontSize="lg">{booking.car.name}</Text>
                      <HStack gap="2" opacity="0.8">
                        <Icon as={Calendar} size="md" />
                        <Text fontSize="xs" fontWeight="bold">{booking.reservation.duration}</Text>
                      </HStack>
                    </Stack>
                  </HStack>
                  <Stack align="flex-end" gap="0">
                    <Text fontSize="xs" fontWeight="bold" opacity="0.8">TOTAL TO PAY</Text>
                    <Text fontSize="2xl" fontWeight="900">${booking.financials.totalAmount}</Text>
                  </Stack>
                </Flex>
              </Box>
            )}

            <Box p="8">
              {/* @ts-ignore */}
              <RadioGroup value={method} onValueChange={(e) => setMethod(e.value)} colorPalette="teal">
                <Stack gap="4">
                  <Text fontSize="xs" fontWeight="800" color="gray.400" mb="2">PAYMENT METHOD</Text>
                  <HStack gap="3" mb="6">
                    <PaymentMethodTab active={method === "card"} value="card" icon={CreditCard} label="Card" />
                    <PaymentMethodTab active={method === "stripe"} value="stripe" img="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" />
                    <PaymentMethodTab active={method === "paypal"} value="paypal" img="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" />
                  </HStack>

                  <Separator mb="4" />

                  {method === "card" ? (
                    <Stack gap="4" className="animate-in fade-in duration-500">
                      <Stack gap="1.5">
                        <Text fontSize="xs" fontWeight="bold" color="gray.500" ml="1">CARDHOLDER NAME</Text>
                        <Input placeholder="John Doe" size="lg" rounded="xl" bg="gray.50/50" border="none" _focus={{ bg: "white", boxShadow: "0 0 0 2px #319795" }} />
                      </Stack>
                      <Stack gap="1.5">
                        <Text fontSize="xs" fontWeight="bold" color="gray.500" ml="1">CARD NUMBER</Text>
                        <Input placeholder="0000 0000 0000 0000" size="lg" rounded="xl" bg="gray.50/50" border="none" _focus={{ bg: "white", boxShadow: "0 0 0 2px #319795" }} />
                      </Stack>
                      <HStack gap="4">
                        <Stack gap="1.5" flex="1">
                          <Text fontSize="xs" fontWeight="bold" color="gray.500" ml="1">EXPIRY</Text>
                          <Input placeholder="MM / YY" size="lg" rounded="xl" bg="gray.50/50" border="none" />
                        </Stack>
                        <Stack gap="1.5" flex="1">
                          <Text fontSize="xs" fontWeight="bold" color="gray.500" ml="1">CVC</Text>
                          <Input placeholder="123" size="lg" rounded="xl" bg="gray.50/50" border="none" />
                        </Stack>
                      </HStack>
                    </Stack>
                  ) : (
                    <Center p="10" bg="gray.50" rounded="2xl" border="2px dashed" borderColor="gray.200" flexDir="column" gap="3" className="animate-in zoom-in-95 duration-300">
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        You will be redirected to {method.toUpperCase()} to securely complete your payment.
                      </Text>
                      <Icon as={ExternalLink} color="gray.400" />
                    </Center>
                  )}
                </Stack>
              </RadioGroup>

              <Button
                mt="10" w="full" size="xl" colorPalette="teal" h="16" rounded="2xl"
                fontWeight="900" onClick={handlePayment} _active={{ transform: "scale(0.98)" }}
              >
                Confirm and Pay ${booking?.financials?.totalAmount}
              </Button>

              <HStack justify="center" mt="6" color="gray.400" gap="2">
                <Lock size={14} />
                <Text fontSize="xs" fontWeight="bold" letterSpacing="widest">AES-256 ENCRYPTED</Text>
              </HStack>
            </Box>
          </Box>

          <Center>
            <HStack color="gray.400" cursor="pointer" onClick={() => window.history.back()} _hover={{ color: "teal.600" }} transition="all 0.2s" gap="1">
              <ChevronLeft size={14} />
              <Text fontSize="xs" fontWeight="bold">BACK TO BOOKING DETAILS</Text>
            </HStack>
          </Center>
        </Stack>
      </Container>
    </Box>
  )
}

function PaymentMethodTab({ active, icon: LucideIcon, img, label, value }: any) {
  return (
    <Radio value={value} flex="1">
      <Flex
        direction="column" align="center" justify="center" p="4" h="72px" rounded="2xl" border="2px solid"
        borderColor={active ? "teal.500" : "gray.100"}
        bg={active ? "teal.50/50" : "white"}
        transition="all 0.2s"
        cursor="pointer"
        position="relative"
      >
        {img ? (
          <Image src={img} h="18px" alt={value} filter={active ? "none" : "grayscale(100%)"} opacity={active ? 1 : 0.5} />
        ) : (
          <HStack gap="2">
            <LucideIcon size={18} className={active ? "text-teal-600" : "text-gray-400"} />
            <Text fontSize="xs" fontWeight="bold" color={active ? "teal.700" : "gray.500"}>{label}</Text>
          </HStack>
        )}
      </Flex>
    </Radio>
  )
}