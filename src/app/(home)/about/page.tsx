"use client"

import {
  Box, Container, Flex, Heading, Stack, Text, 
  SimpleGrid, Grid, GridItem, Badge, HStack, Span, Circle
} from "@chakra-ui/react"
import { ArrowUpRight, Shield, Zap, Globe, Heart } from "lucide-react"

export default function AboutUsPage() {
  return (
    <Box bg="white" minH="100vh" color="gray.900">
      
      {/* 1. Large Typographic Hero */}
      <Box pt="32" pb="20">
        <Container maxW="7xl">
          <Stack gap="8">
            <Badge variant="subtle" colorPalette="teal" alignSelf="flex-start" rounded="full" px="4" py="1">
              EST. 2026
            </Badge>
            <Heading fontSize={{ base: "5xl", md: "8xl" }} fontWeight="900" letterSpacing="-0.05em" lineHeight="0.9">
              More than a rental. <br />
              <Span color="teal.500">A new standard.</Span>
            </Heading>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="flex-end" gap="8">
              <Text fontSize="xl" color="gray.500" maxW="xl" fontWeight="medium">
                We are building the world's most trusted car-sharing ecosystem, 
                designed for those who value time, security, and elegance.
              </Text>
              <HStack gap="4" color="gray.300" fontSize="sm" fontWeight="bold">
                <Text>SCROLL TO DISCOVER</Text>
                <Box h="1px" w="40px" bg="gray.300" />
              </HStack>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* 2. Bento-Style Grid (Values & Stats Combined) */}
      <Container maxW="7xl" pb="32">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          templateRows={{ base: "auto", md: "repeat(2, 280px)" }}
          gap="6"
        >
          {/* Main Value Prop */}
          <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={1} border="1px solid" borderColor="gray.100" rounded="3xl" p="10" bg="gray.50/50">
            <Stack h="full" justify="space-between">
              <Shield size={32} className="text-teal-600" />
              <Box>
                <Heading size="xl" fontWeight="900" mb="2">Uncompromising Safety</Heading>
                <Text color="gray.600" fontSize="lg">Every vehicle in our fleet undergoes a rigorous 150-point inspection and real-time health monitoring.</Text>
              </Box>
            </Stack>
          </GridItem>

          {/* Small Stat Box */}
          <GridItem border="1px solid" borderColor="gray.100" rounded="3xl" p="10" textAlign="center">
            <Stack h="full" justify="center" align="center">
              <Heading fontSize="6xl" fontWeight="900" color="teal.600">99%</Heading>
              <Text fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="widest">User Satisfaction</Text>
            </Stack>
          </GridItem>

          {/* Mission Box */}
          <GridItem border="1px solid" borderColor="gray.100" rounded="3xl" p="10">
            <Stack h="full" justify="space-between">
              <Zap size={32} className="text-teal-600" />
              <Box>
                <Heading size="lg" fontWeight="900" mb="2">Fast. Fluid.</Heading>
                <Text color="gray.600">Pick up your car in under 60 seconds with our digital key technology.</Text>
              </Box>
            </Stack>
          </GridItem>

          {/* Large Image or Secondary Value Placeholder */}
          <GridItem colSpan={{ base: 1, md: 2 }} bg="gray.900" rounded="3xl" p="10" color="white" position="relative" overflow="hidden">
            <Stack h="full" justify="center">
              <Heading size="2xl" fontWeight="900" letterSpacing="tight" zIndex="2">
                Join the future of <br /> mobility today.
              </Heading>
              <Circle position="absolute" right="-50px" top="-50px" size="300px" bg="teal.600/20" />
              <HStack mt="6" color="teal.400" cursor="pointer"  >
                 <Text fontWeight="bold">BECOME A HOST</Text>
                 <ArrowUpRight size={20} />
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
      </Container>

      {/* 3. The Visionaries (Minimalist List) */}
      <Box py="24" borderTopWidth="1px" borderColor="gray.100">
        <Container maxW="5xl">
          <Flex direction={{ base: "column", md: "row" }} gap="20" align="flex-start">
             <Box w={{ base: "full", md: "30%" }}>
                <Text fontWeight="900" fontSize="xs" letterSpacing="0.3em" color="gray.400" mb="4">
                    OUR PRINCIPLES
                </Text>
             </Box>
             <Stack flex="1" gap="12">
                <PrincipleItem number="01" title="Radical Transparency" desc="No hidden fees, no fine print. Every cost is explained in your invoice." />
                <PrincipleItem number="02" title="Sustainability Focused" desc="Transitioning our fleet to 80% electric by the end of 2027." />
                <PrincipleItem number="03" title="Human Support" desc="Real experts available 24/7 to help you with your journey." />
             </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

// Helper Components
function PrincipleItem({ number, title, desc }: any) {
  return (
    <HStack align="flex-start" gap="10">
      <Text fontSize="md" fontWeight="900" color="teal.600" pt="1">{number}</Text>
      <Stack gap="2">
        <Heading size="md" fontWeight="900">{title}</Heading>
        <Text color="gray.500" fontSize="lg" lineHeight="tall">{desc}</Text>
      </Stack>
    </HStack>
  )
}