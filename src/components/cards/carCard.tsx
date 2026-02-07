"use client"

import { Box, Image, Text, Flex, Stack, HStack, Badge, Icon, Button, Separator, Heading, SimpleGrid } from "@chakra-ui/react"
import { Users, Star, Gauge, Sparkles, Heart, Fuel, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AddToWishlist from "./addToWishlist"

interface CarCardProps {
  id: number
  name: string
  image: string
  price: number
  seats: number
  type: string
  rating: number
  transmission: string
  fuelType?: string
}

export function CarCard({ id, name, image, price, seats, type, rating, transmission, fuelType = "Hybrid" }: CarCardProps) {
  const router = useRouter()
 
  return (
    <Box

      onClick={() => router.push(`/search/${id}`)}
      cursor="pointer"
      position="relative"
      bg="white"
      rounded="3xl"
      borderWidth="1px"
      borderColor="gray.100"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-8px)",
        borderColor: "teal.500/30"
      }}
    >
      {/* 1. Header Badges */}
      <Flex p="5" justify="space-between" align="center" position="absolute" w="full" zIndex="10">
        <Badge
          bg="white/80"
          backdropFilter="blur(10px)"
          color="teal.700"
          px="3"
          py="1"
          rounded="full"
          textTransform="none"
          fontSize="xs"
          fontWeight="bold"
          shadow="sm"
          display="flex"
          alignItems="center"
          gap="1"
        >
          <Sparkles size={12} fill="currentColor" />
          {type}
        </Badge>


        <AddToWishlist carId={id.toString()} />
      </Flex>

      {/* 2. Visual Content */}
      <Box overflow="hidden">
        <Image
          src={image}
          alt={name}
          w="full"
          h="180px"
          transition="transform 0.5s ease"
          _groupHover={{ transform: "scale(1.08) translateX(5px)" }}
        />
      </Box>

      {/* 3. Card Information Body */}
      <Stack p="6" gap="4">
        <Box>
          <Flex justify="space-between" align="baseline">
            <Heading size="md" fontWeight="800" letterSpacing="tight" color="gray.800">
              {name}
            </Heading>
            <HStack gap="1" color="orange.500">
              <Star size={14} fill="currentColor" />
              <Text fontSize="sm" fontWeight="bold">{rating}</Text>
            </HStack>
          </Flex>
          <Text fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase" mt="1">
            Standard Class • Instant Book
          </Text>
        </Box>

        {/* Technical Specs Row */}
        <SimpleGrid columns={3} gap="2">
          <SpecItem icon={Users} label={`${seats} Seats`} />
          <SpecItem icon={Gauge} label={transmission} />
          <SpecItem icon={Fuel} label={fuelType} />
        </SimpleGrid>

        <Separator opacity="0.5" />

        {/* 4. Footer: Price & CTA */}
        <Flex justify="space-between" align="center">
          <Box>
            <HStack align="baseline" gap="1">
              <Text fontSize="2xl" fontWeight="800" color="teal.600">
                ${price}
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="gray.400">
                / day
              </Text>
            </HStack>
          </Box>

          <Button
            size="md"
            colorPalette="teal"
            rounded="xl"
            fontWeight="bold"
            px="5"
            transition="all 0.2s"
            _groupHover={{ shadow: "lg", transform: "scale(1.02)" }}
          >
            Details
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

// Helper component for cleaner code
function SpecItem({ icon, label }: { icon: any, label: string }) {
  return (
    <Stack gap="1" align="center" p="2" bg="gray.50" rounded="xl" transition="background 0.2s" _groupHover={{ bg: "teal.50" }}>
      <Icon as={icon} boxSize="4" color="gray.500" _groupHover={{ color: "teal.600" }} />
      <Text fontSize="10px" fontWeight="bold" color="gray.500" textAlign="center">
        {label}
      </Text>
    </Stack>
  )
}