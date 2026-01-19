"use client"

import { Box, Text, Heading, Button, Stack, Input, Center, Flex, HStack } from "@chakra-ui/react"
import { MapPin, Calendar, Search, Shield, Clock, Users, Car, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function Hero() {
    const [pickupLocation, setPickupLocation] = useState("")
    const [pickupDate, setPickupDate] = useState("")
    const dateInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Set today's date as default
    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setPickupDate(formattedDate)
    }, [])
    
    const handleSearch = () => {
        if (!pickupLocation.trim()) return

        const params = new URLSearchParams()
        params.append("location", pickupLocation.trim())
        
        if (pickupDate) {
            params.append("startDate", pickupDate)
        }
        
        router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleDateClick = () => {
        // Focus and click the hidden date input to open browser's date picker
        setTimeout(() => {
            if (dateInputRef.current) {
                dateInputRef.current.showPicker?.()
                dateInputRef.current.focus()
            }
        }, 100)
    }

    const formatDisplayDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <Box position="relative" minH="90vh" w="full" overflow="hidden" bg="gray.50">
             <Box
                position="absolute" top="-10%" right="-5%"
                w="500px" h="500px" bg="teal.100/30"
                rounded="full" filter="blur(80px)"
            />
             <Box
                position="absolute" bottom="-10%" left="-5%"
                w="400px" h="400px" bg="teal.50"
                rounded="full" filter="blur(60px)"
            />


            <Center h="full" minH="90vh" px="4">
                <Stack 
                    gap={{ base: "8", md: "10" }} 
                    align="center" 
                    textAlign="center" 
                    w="full" 
                    maxW="6xl"
                    py={{ base: "12", md: "16" }}
                >
                    {/* Premium Badge */}
                    <Box
                        bg="rgba(13, 148, 136, 0.1)"
                        border="1px solid"
                        borderColor="rgba(13, 148, 136, 0.2)"
                        px="5"
                        py="2"
                        rounded="full"
                        display="inline-flex"
                        alignItems="center"
                        gap="2"
                    >
                        <Shield size={14} color="#0D9488" />
                        <Text
                            color="#0D9488"
                            fontWeight="semibold"
                            fontSize="sm"
                            letterSpacing="wide"
                        >
                            PREMIUM CAR RENTAL
                        </Text>
                    </Box>

                    {/* Main Heading */}
                    <Stack gap="4">
                        <Heading
                            color="#1E293B"
                            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="bold"
                            lineHeight="1.1"
                        >
                            Find & Book Your
                            <Box 
                                as="span" 
                                color="#0D9488"
                                ml="2"
                            >
                                Perfect Ride
                            </Box>
                        </Heading>
                        
                        <Heading
                            color="#1E293B"
                            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                            fontWeight="bold"
                            lineHeight="1.1"
                        >
                            in Minutes
                        </Heading>
                    </Stack>

                    {/* Subheading */}
                    <Text 
                        color="#64748B" 
                        fontSize={{ base: "lg", md: "xl" }} 
                        maxW="2xl"
                        lineHeight="1.7"
                    >
                        Experience premium comfort and reliability with our curated fleet. 
                        Book your ideal vehicle quickly and easily.
                    </Text>

                    {/* Features */}
                    <HStack 
                        gap={{ base: "6", md: "10" }} 
                        justify="center" 
                        flexWrap="wrap"
                        pt="2"
                    >
                        <HStack gap="3">
                            <Box
                                p="2"
                                rounded="lg"
                                bg="rgba(13, 148, 136, 0.1)"
                                border="1px solid"
                                borderColor="rgba(13, 148, 136, 0.2)"
                            >
                                <Car size={18} color="#0D9488" />
                            </Box>
                            <Box textAlign="left">
                                <Text color="#1E293B" fontSize="md" fontWeight="semibold">250+ Vehicles</Text>
                                <Text color="#64748B" fontSize="sm">Wide Selection</Text>
                            </Box>
                        </HStack>
                        
                        <HStack gap="3">
                            <Box
                                p="2"
                                rounded="lg"
                                bg="rgba(13, 148, 136, 0.1)"
                                border="1px solid"
                                borderColor="rgba(13, 148, 136, 0.2)"
                            >
                                <Clock size={18} color="#0D9488" />
                            </Box>
                            <Box textAlign="left">
                                <Text color="#1E293B" fontSize="md" fontWeight="semibold">24/7 Service</Text>
                                <Text color="#64748B" fontSize="sm">Always Available</Text>
                            </Box>
                        </HStack>
                        
                        <HStack gap="3">
                            <Box
                                p="2"
                                rounded="lg"
                                bg="rgba(13, 148, 136, 0.1)"
                                border="1px solid"
                                borderColor="rgba(13, 148, 136, 0.2)"
                            >
                                <Users size={18} color="#0D9488" />
                            </Box>
                            <Box textAlign="left">
                                <Text color="#1E293B" fontSize="md" fontWeight="semibold">5000+ Happy</Text>
                                <Text color="#64748B" fontSize="sm">Customers</Text>
                            </Box>
                        </HStack>
                    </HStack>

                    {/* Search Box */}
                    <Box w="full" maxW="3xl" mt={{ base: "8", md: "12" }}>
                        
                        <Box bg="white" border="1px solid" borderColor="gray.200" rounded="xl" p={{ base: "6", md: "8" }} shadow="0 10px 25px rgba(0, 0, 0, 0.05)">
                            <Text 
                                color="#1E293B" 
                                fontSize="md" 
                                fontWeight="semibold" 
                                mb="6" 
                                textAlign="center"
                            >
                                Where and when do you need a car?
                            </Text>
                            
                            <Flex 
                                direction={{ base: "column", lg: "row" }} 
                                gap={{ base: "4", lg: "3" }} 
                                align={{ lg: "center" }}
                            >
                                {/* Location Input */}
                                <Box flex="1.5" position="relative">
                                    <Box position="absolute" left="4" top="50%" transform="translateY(-50%)" zIndex="2">
                                        <MapPin size={20} color="#94a3b8" />
                                    </Box>
                                    <Input
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                        placeholder="Enter city, airport, or address"
                                        h="14"
                                        pl="12"
                                        bg="white"
                                        border="1px solid"
                                        borderColor="#E2E8F0"
                                        color="#1E293B"
                                        rounded="lg"
                                        _placeholder={{ color: "#94a3b8" }}
                                        _hover={{ borderColor: "#CBD5E1" }}
                                        _focus={{ borderColor: "#0D9488", boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)" }}
                                        onKeyPress={handleKeyPress}
                                    />
                                </Box>

                                {/* Custom Date Picker Button */}
                                <Box flex="1" position="relative">
                                    <Button
                                        onClick={handleDateClick}
                                        h="14"
                                        w="full"
                                        bg="white"
                                        border="1px solid"
                                        borderColor="#E2E8F0"
                                        color="#1E293B"
                                        rounded="lg"
                                        fontWeight="normal"
                                        justifyContent="flex-start"
                                        pl="12"
                                        pr="4"
                                        _hover={{ 
                                            borderColor: "#CBD5E1",
                                            bg: "white"
                                        }}
                                        _active={{ bg: "white" }}
                                        _focus={{ 
                                            borderColor: "#0D9488", 
                                            boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)",
                                            bg: "white"
                                        }}
                                    >
                                        <Box position="absolute" left="4" top="50%" transform="translateY(-50%)">
                                            <Calendar size={20} color="#94a3b8" />
                                        </Box>
                                        <Text flex="1" textAlign="left" color={pickupDate ? "#1E293B" : "#94a3b8"}>
                                            {pickupDate ? formatDisplayDate(pickupDate) : "Select date"}
                                        </Text>
                                        <ChevronDown size={16} color="#94a3b8" />
                                    </Button>
                                    
                                    {/* Hidden date input */}
                                    <input
                                        ref={dateInputRef}
                                        type="date"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        style={{
                                            position: 'absolute',
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            height: '1px',
                                            width: '1px'
                                        }}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </Box>

                                {/* Search Button */}
                                <Button
                                    bg="#0D9488"
                                    color="white"
                                    h="14"
                                    px={{ base: "8", lg: "10" }}
                                    rounded="lg"
                                    fontSize="md"
                                    fontWeight="semibold"
                                    _hover={{
                                        bg: "#0c857a",
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 10px 20px rgba(13, 148, 136, 0.2)"
                                    }}
                                    _active={{ transform: "translateY(0)" }}
                                    transition="all 0.2s ease"
                                    // @ts-ignore
                                    leftElement={<Search size={20} />}
                                    onClick={handleSearch}
                                    isDisabled={!pickupLocation.trim()}
                                    opacity={!pickupLocation.trim() ? 0.7 : 1}
                                    flexShrink={0}
                                >
                                    Search Cars
                                </Button>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Trust Indicators */}
                    <HStack gap={{ base: "4", md: "8" }} mt="8" flexWrap="wrap" justify="center">
                        <Text color="#64748B" fontSize="sm" fontWeight="medium">✓ No Hidden Fees</Text>
                        <Text color="#64748B" fontSize="sm" fontWeight="medium">✓ Free Cancellation</Text>
                        <Text color="#64748B" fontSize="sm" fontWeight="medium">✓ 24/7 Support</Text>
                        <Text color="#64748B" fontSize="sm" fontWeight="medium">✓ Best Price Guarantee</Text>
                    </HStack>
                </Stack>
            </Center>
        </Box>
    )
}