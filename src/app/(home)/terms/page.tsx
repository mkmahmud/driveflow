"use client"

import {
  Box, Container, Flex, Heading, Stack, Text, 
  Separator, Span, Grid, GridItem, Circle, Badge,
  HStack
} from "@chakra-ui/react"
import { ArrowRight, Info, Scale, ShieldCheck, FileText } from "lucide-react"

const TERMS_SECTIONS = [
  {
    id: "01",
    label: "ACCESS",
    title: "Eligibility & Digital Identity",
    content: "To maintain the integrity of our ecosystem, every user must pass a 3D biometric verification. You must be 21+ with a clean driving record. High-performance vehicles require a 25+ age bracket and a verified platform history.",
    icon: ShieldCheck
  },
  {
    id: "02",
    label: "FUNDS",
    title: "Financial Protocols",
    content: "We believe in radical transparency. Every transaction is logged. Security deposits are processed as a 'hold'—meaning funds never leave your account, they are simply reserved and released instantly upon vehicle return.",
    icon: Info
  },
  {
    id: "03",
    label: "USAGE",
    title: "Operating Boundaries",
    content: "Vehicle health is monitored via IoT. Smoking, pets (unless specified), and off-roading are prohibited. Respect the machinery, follow local laws, and ensure the vehicle is returned in the condition it was received.",
    icon: Scale
  }
]

export default function TermsPage() {
  return (
    <Box bg="white" minH="100vh" color="gray.900">
      
      {/* 1. THE HERO: Impactful & Asymmetric */}
      <Box pt="40" pb="24" borderBottom="1px solid" borderColor="gray.100">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap="8">
            <GridItem colSpan={{ base: 1, lg: 8 }}>
              <Badge variant="subtle" colorPalette="teal" px="4" rounded="full" mb="6">
                LEGAL VERSION 4.0
              </Badge>
              <Heading fontSize={{ base: "6xl", md: "8xl", xl: "9xl" }} fontWeight="900" letterSpacing="-0.06em" lineHeight="0.8">
                TERMS <Span color="teal.500">/</Span><br />SERVICE
              </Heading>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 4 }} alignSelf="flex-end">
              <Stack gap="6" borderLeft={{ lg: "4px solid" }} borderColor="teal.500" pl="8" py="2">
                <Text fontSize="xl" fontWeight="600" lineHeight="1.4">
                  By accessing this platform, you enter a binding agreement designed to protect both the machine and the mover.
                </Text>
                <Text color="gray.400" fontWeight="bold" fontSize="xs" letterSpacing="widest">
                  UPDATED JAN 2026
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* 2. THE CONTENT: Modular Bento Grid */}
      <Box py="20">
        <Container maxW="7xl">
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
            gap="0" 
            borderWidth="1px" 
            borderColor="gray.100"
            rounded="3xl"
            overflow="hidden"
          >
            {TERMS_SECTIONS.map((section, idx) => (
              <GridItem 
                key={section.id} 
                p="12" 
                borderRight={{ base: "none", md: idx !== 2 ? "1px solid" : "none" }}
                borderColor="gray.100"
                _hover={{ bg: "gray.50" }}
                transition="all 0.3s ease"
              >
                <Stack gap="12" h="full" justify="space-between">
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="900" fontSize="xs" color="teal.600" letterSpacing="0.2em">
                      {section.label}
                    </Text>
                    <section.icon size={20} strokeWidth={1.5} className="text-gray-300" />
                  </Flex>
                  
                  <Stack gap="4">
                    <Heading size="xl" fontWeight="900" letterSpacing="-0.03em">
                      {section.title}
                    </Heading>
                    <Text color="gray.600" fontSize="lg" lineHeight="tall" fontWeight="medium">
                      {section.content}
                    </Text>
                  </Stack>

                  <Text fontSize="4xl" fontWeight="900" color="gray.100">
                    {section.id}
                  </Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. THE "DARK CALLOUT" Section (No shadow, just high contrast) */}
      <Box py="20">
        <Container maxW="7xl">
          <Box bg="gray.900" color="white" rounded="3xl" p={{ base: "10", md: "20" }} position="relative" overflow="hidden">
            <Stack gap="8" maxW="2xl" position="relative" zIndex="2">
              <Heading size="2xl" fontWeight="900" letterSpacing="-0.02em">
                Looking for the short version?
              </Heading>
              <Text fontSize="xl" opacity="0.7" fontWeight="medium">
                We’ve summarized our entire legal framework into 5 key points for the modern traveler. 
                Transparency shouldn't be complicated.
              </Text>
              <Flex 
                as="button" 
                align="center" 
                gap="4" 
                w="fit-content" 
                bg="teal.600" 
                px="8" py="4" 
                rounded="2xl" 
                fontWeight="bold"
                _hover={{ bg: "teal.500", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                Download Plain English PDF <ArrowRight size={20} />
              </Flex>
            </Stack>
            
            {/* Minimalist Background Decoration */}
            <Circle size="400px" bg="teal.600" opacity="0.1" position="absolute" right="-100px" bottom="-100px" />
          </Box>
        </Container>
      </Box>

    
    </Box>
  )
}