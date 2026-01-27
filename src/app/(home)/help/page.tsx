"use client"

import {
  Box, Container, Flex, Heading, Stack, Text, 
  Grid, GridItem, Input, Span, HStack, Circle, Badge, SimpleGrid
} from "@chakra-ui/react"
import { Search, ArrowRight, LifeBuoy, Zap, ShieldCheck, CreditCard, MessageSquare, BookOpen } from "lucide-react"

const HELP_CATEGORIES = [
  { title: "Booking & Trips", icon: Zap, color: "teal", count: "14 Articles" },
  { title: "Account & Safety", icon: ShieldCheck, color: "blue", count: "10 Articles" },
  { title: "Payments", icon: CreditCard, color: "purple", count: "08 Articles" },
  { title: "Hosting Fleet", icon: BookOpen, color: "orange", count: "22 Articles" },
]

export default function HelpCenterPage() {
  return (
    <Box bg="white" minH="100vh">
      {/* 1. Header Section - Matching your Search & Filter style */}
      <Box py="20" borderBottomWidth="1px" borderColor="gray.100" bg="gray.50/30">
        <Container maxW="5xl">
          <Stack gap="8" align="center" textAlign="center">
            <Stack gap="3">
              <Badge variant="subtle" colorPalette="teal" alignSelf="center" rounded="full" px="4">
                Support Hub
              </Badge>
              <Heading size="3xl" fontWeight="900" letterSpacing="tight">
                How can we help <Span color="teal.600">today?</Span>
              </Heading>
              <Text color="gray.500" fontSize="lg" maxW="lg">
                Search our knowledge base or browse categories below to find answers to your questions.
              </Text>
            </Stack>

            {/* Search Input - Matching your Ecosystem Search Bar */}
            <Box w="full" maxW="2xl" position="relative">
              <Input 
                placeholder="Search articles, guides, and more..." 
                h="16"
                pl="14"
                rounded="2xl"
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
                fontSize="lg"
                _focus={{ borderColor: "teal.600", ring: "1px", ringColor: "teal.600" }}
              />
              <Box position="absolute" left="5" top="50%" transform="translateY(-50%)" color="gray.400">
                <Search size={22} />
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* 2. Category Grid - Matching your Card/Dashboard style */}
      <Container maxW="5xl" py="20">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
          {HELP_CATEGORIES.map((cat, idx) => (
            <Stack 
              key={idx} 
              p="8" 
              rounded="3xl" 
              borderWidth="1px" 
              borderColor="gray.100" 
              bg="white"
              transition="all 0.2s"
              cursor="pointer"
              _hover={{ borderColor: "teal.500", bg: "teal.50/10" }}
               
            >
              <Circle size="12" bg="teal.50" color="teal.600" mb="4">
                <cat.icon size={24} />
              </Circle>
              <Stack gap="1">
                <Heading size="md" fontWeight="800">{cat.title}</Heading>
                <Text fontSize="xs" fontWeight="bold" color="gray.400">{cat.count}</Text>
              </Stack>
              <HStack mt="6" color="teal.600" fontWeight="bold" fontSize="sm" opacity="0" _groupHover={{ opacity: 1 }} transition="opacity 0.2s">
                <Text>View all</Text>
                <ArrowRight size={14} />
              </HStack>
            </Stack>
          ))}
        </SimpleGrid>

        {/* 3. Popular Articles - Clean List Style */}
        <Box mt="24">
          <Heading size="xl" fontWeight="900" mb="10">Popular Articles</Heading>
          <Stack gap="0" borderWidth="1px" borderColor="gray.100" rounded="3xl" overflow="hidden">
            <ArticleLink title="Setting up your Digital Key for the first time" />
            <ArticleLink title="What happens if I return the car late?" />
            <ArticleLink title="Understanding your insurance deductible" />
            <ArticleLink title="How to earn more as a host" isLast />
          </Stack>
        </Box>

        {/* 4. Contact Footer - Minimal & Matching */}
        <Flex 
          mt="24" 
          p="10" 
          rounded="3xl" 
          bg="gray.900" 
          color="white" 
          justify="space-between" 
          align="center"
          direction={{ base: "column", md: "row" }}
          gap="8"
        >
          <HStack gap="6">
            <Circle size="14" bg="teal.600">
                <MessageSquare size={24} color="white" />
            </Circle>
            <Stack gap="1">
                <Heading size="lg" fontWeight="800">Still need help?</Heading>
                <Text opacity="0.7">Our support team is available 24/7 for you.</Text>
            </Stack>
          </HStack>
          <Box 
            as="button" 
            bg="white" 
            color="gray.900" 
            px="8" py="4" 
            rounded="2xl" 
            fontWeight="900"
            _hover={{ bg: "teal.50" }}
          >
            Contact Support
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

function ArticleLink({ title, isLast }: { title: string; isLast?: boolean }) {
  return (
    <Flex 
      py="6" 
      px="8" 
      justify="space-between" 
      align="center" 
      borderBottomWidth={isLast ? "0px" : "1px"} 
      borderColor="gray.100"
      cursor="pointer"
      _hover={{ bg: "gray.50/50" }}
       
    >
      <Text fontWeight="700" fontSize="lg" color="gray.700" _groupHover={{ color: "teal.600" }}>{title}</Text>
      <ArrowRight size={18} className="text-gray-300" />
    </Flex>
  )
}