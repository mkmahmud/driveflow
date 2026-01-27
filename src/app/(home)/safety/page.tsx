"use client"

import {
  Box, Container, Flex, Heading, Stack, Text, 
  Grid, GridItem, Badge, Span, HStack, Circle, SimpleGrid
} from "@chakra-ui/react"
import { ShieldCheck, PhoneCall, Eye, Lock, Zap, CheckCircle2 } from "lucide-react"

const SAFETY_PILLARS = [
  {
    title: "Biometric Verification",
    desc: "Every host and guest undergoes a multi-stage identity check including 3D facial recognition and document authentication.",
    icon: Eye
  },
  {
    title: "Real-time Monitoring",
    desc: "Vehicles are equipped with IoT sensors that monitor engine health and safety parameters in real-time.",
    icon: Zap
  },
  {
    title: "Secure Payments",
    desc: "All transactions are encrypted. We never store your full card details, using bank-grade tokenization instead.",
    icon: Lock
  }
]

export default function SafetyPage() {
  return (
    <Box bg="white" minH="100vh" color="gray.900">
      
      {/* 1. HERO: The "Trust" Statement */}
      <Box pt="32" pb="20" borderBottom="1px solid" borderColor="gray.100">
        <Container maxW="5xl">
          <Stack gap="8">
            <Badge variant="subtle" colorPalette="teal" alignSelf="flex-start" rounded="full" px="4">
              SECURE ECOSYSTEM
            </Badge>
            <Heading fontSize={{ base: "4xl", md: "7xl" }} fontWeight="900" letterSpacing="-0.05em" lineHeight="0.9">
              Your safety is <br /> 
              <Span color="teal.600">our architecture.</Span>
            </Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl" fontWeight="medium">
              We’ve built a multi-layered safety protocol into every step of the journey, 
              from the moment you book to the moment you return the keys.
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* 2. THE THREE PILLARS: Rounded Ecosystem Cards */}
      <Container maxW="5xl" py="20">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
          {SAFETY_PILLARS.map((pillar, idx) => (
            <Stack 
              key={idx} 
              p="10" 
              rounded="3xl" 
              border="1px solid" 
              borderColor="gray.100"
              transition="border-color 0.3s"
              _hover={{ borderColor: "teal.600" }}
            >
              <Circle size="12" bg="teal.50" color="teal.600" mb="4">
                <pillar.icon size={24} />
              </Circle>
              <Heading size="lg" fontWeight="900" letterSpacing="-0.02em">{pillar.title}</Heading>
              <Text color="gray.600" lineHeight="tall">{pillar.desc}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>

      {/* 3. EMERGENCY PROTOCOLS: The High-Contrast Break */}
      <Box bg="gray.900" color="white" py="20" mx={{ base: "0", md: "6" }} rounded={{ base: "0", md: "5xl" }}>
        <Container maxW="5xl">
            {/* @ts-ignore */}
          <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap="12" align="center">
            <GridItem colSpan={{ base: 1, lg: 5 }}>
              <Stack gap="6">
                <Heading size="2xl" fontWeight="900" letterSpacing="-0.02em">Emergency <br /> Assistance</Heading>
                <Text opacity="0.7" fontSize="lg">
                  In the event of an accident or breakdown, our 24/7 Priority Support is one tap away in the app.
                </Text>
                <HStack 
                  as="button" 
                  bg="teal.600" 
                  color="white" 
                  px="8" py="4" 
                  rounded="2xl" 
                  fontWeight="900"
                  _hover={{ bg: "teal.500" }}
                  w="fit-content"
                >
                  <PhoneCall size={20} />
                  <Text ml="2">Contact 24/7 Support</Text>
                </HStack>
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 7 }}>
              <Stack gap="4">
                 <SafetyPoint title="24/7 Roadside Assistance" />
                 <SafetyPoint title="Direct Emergency Line to Platform Support" />
                 <SafetyPoint title="Automatic Incident Logging & Telematics" />
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* 4. VERIFICATION BADGE: Trust Signal */}
      <Container maxW="5xl" py="24">
         <Flex direction={{ base: "column", md: "row" }} gap="12" align="center" justify="center" textAlign="center">
            <ShieldCheck size={80} strokeWidth={1} className="text-teal-600" />
            <Stack gap="2" maxW="md">
               <Heading size="xl" fontWeight="900">Verified Platform</Heading>
               <Text color="gray.500">
                  Every vehicle is inspected by a certified technician before it enters our fleet. 
                  We maintain a 100% compliance rate with local road safety regulations.
               </Text>
            </Stack>
         </Flex>
      </Container>
    </Box>
  )
}

function SafetyPoint({ title }: { title: string }) {
    return (
        <HStack p="5" border="1px solid" borderColor="whiteAlpha.200" rounded="2xl" gap="4">
            <CheckCircle2 size={20} className="text-teal-500" />
            <Text fontWeight="800" fontSize="md">{title}</Text>
        </HStack>
    )
}