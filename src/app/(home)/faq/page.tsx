"use client"

import {
  Box, Container, Flex, Heading, Stack, Text, 
  Accordion, HStack, Circle,  Input, Badge
} from "@chakra-ui/react"
import { Plus, Search,  Car,  CreditCard } from "lucide-react"
import { useState } from "react"

const FAQ_DATA = [
  {
    category: "Booking",
    icon: Car,
    questions: [
      { q: "How do I modify my reservation?", a: "You can modify your dates or car selection through the 'My Bookings' panel up to 24 hours before your trip begins." },
      { q: "What is the minimum age to rent?", a: "The standard minimum age is 21. For premium performance models, drivers must be at least 25 years old." }
    ]
  },
  {
    category: "Payment",
    icon: CreditCard,
    questions: [
      { q: "Are there hidden service fees?", a: "No. All fees, including the $25 standard service fee and protection plans, are shown transparently in your booking invoice." }
    ]
  }
]

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("Booking")

  return (
    <Box bg="white" minH="100vh" py="16">
      <Container maxW="5xl">
        {/* Header - Matching your 'My Bookings' Page Style */}
        <Flex justify="space-between" align="flex-end" mb="12" direction={{ base: "column", md: "row" }} gap="6">
          <Box>
            <Badge variant="subtle" colorPalette="teal" rounded="full" px="3" mb="3">
              Help Center
            </Badge>
            <Heading size="3xl" fontWeight="900" letterSpacing="tight">
              Support & FAQ
            </Heading>
            <Text color="gray.500" fontSize="md">
              Everything you need to know about our ecosystem.
            </Text>
          </Box>

          <Box w={{ base: "full", md: "320px" }} position="relative">
            <Input 
              placeholder="Search topics..." 
              bg="gray.50" 
              borderWidth="1px"
              borderColor="gray.100"
              rounded="xl"
              h="12"
              pl="10"
              _focus={{ borderColor: "teal.500", bg: "white" }}
            />
            <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="gray.400">
              <Search size={18} />
            </Box>
          </Box>
        </Flex>

        {/* Categories Bar - Matching your FilterButton style */}
        <HStack gap="2" mb="10" overflowX="auto" pb="2">
          {FAQ_DATA.map((cat) => (
            <Box
              key={cat.category}
              as="button"
              onClick={() => setActiveTab(cat.category)}
              px="6"
              py="2"
              rounded="xl"
              fontWeight="bold"
              fontSize="sm"
              transition="all 0.2s"
              border="1px solid"
              borderColor={activeTab === cat.category ? "teal.600" : "gray.100"}
              bg={activeTab === cat.category ? "teal.600" : "white"}
              color={activeTab === cat.category ? "white" : "gray.600"}
            >
              <HStack gap="2">
                <cat.icon size={16} />
                <Text>{cat.category}</Text>
              </HStack>
            </Box>
          ))}
        </HStack>

        {/* Content Area - Clean Bordered Accordion */}
        <Stack gap="4">
          <Accordion.Root variant="plain" collapsible defaultValue={["item-0"]}>
            {FAQ_DATA.find(i => i.category === activeTab)?.questions.map((item, idx) => (
              <Accordion.Item 
                key={idx} 
                value={`item-${idx}`}
                borderWidth="1px"
                borderColor="gray.100"
                rounded="2xl"
                mb="4"
                bg="white"
                transition="border-color 0.2s"
                _open={{ borderColor: "teal.200" }}
              >
                <Accordion.ItemTrigger p="6" cursor="pointer" _hover={{ bg: "gray.50/50" }}>
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="800" fontSize="lg" color="gray.800" textAlign="left">
                      {item.q}
                    </Text>
                    <Circle size="8" bg="teal.50" color="teal.600">
                      <Plus size={16} strokeWidth={3} />
                    </Circle>
                  </HStack>
                </Accordion.ItemTrigger>
                
                <Accordion.ItemContent px="6" pb="6" pt="0">
                  <Box borderLeftWidth="2px" borderColor="teal.500" pl="4" py="1">
                    <Text color="gray.600" lineHeight="tall" fontSize="md">
                      {item.a}
                    </Text>
                  </Box>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Stack>
      </Container>
    </Box>
  )
}