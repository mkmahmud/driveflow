"use client"

import { Box, Image, Text, Flex, Stack, HStack } from "@chakra-ui/react"
import { Users, Star, Gauge, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface CarCardProps {
  id: number
  name: string
  image: string
  price: number
  seats: number
  type: string
  rating: number
  transmission: string
}

export function FeaturedCard({ id, name, image, price, seats, type, rating, transmission }: CarCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/cars/${id}`)
  }

  return (
    <Box
      onClick={handleClick}
      cursor="pointer"
      maxW="sm"
      overflow="hidden"
      rounded="2xl"
      bg="white"
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        borderColor: "#0D9488",
        transform: "translateY(-4px)"
      }}
    >
      <Box position="relative">
        {/* Premium Badge */}
        <Box
          position="absolute"
          top="4"
          left="4"
          bg="#0D9488"
          color="white"
          px="3"
          py="1"
          rounded="full"
          fontSize="xs"
          fontWeight="semibold"
          zIndex="1"
          display="flex"
          alignItems="center"
          gap="1"
          backdropFilter="blur(4px)"
        >
          <Sparkles size={12} />
          {type}
        </Box>

        {/* Rating Badge */}
        <Box
          position="absolute"
          top="4"
          right="4"
          bg="white"
          px="3"
          py="1"
          rounded="full"
          fontSize="sm"
          fontWeight="semibold"
          zIndex="1"
          display="flex"
          alignItems="center"
          gap="1"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(4px)"
        >
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text color="#1E293B">{rating}</Text>
        </Box>

        <Image
          src={image}
          alt={name}
          h="220px"
          w="full"
          objectFit="cover"
        />
      </Box>

      <Box p="6">
        <Flex justify="space-between" align="center" mb="4">
          <Text
            fontWeight="bold"
            fontSize="xl"
            color="#1E293B"
            letterSpacing="tight"
          >
            {name}
          </Text>
          <Box textAlign="right">
            <Text
              fontWeight="bold"
              fontSize="2xl"
              color="#0D9488"
              lineHeight="1"
            >
              ${price}
            </Text>
            <Text
              fontSize="sm"
              color="#64748B"
              fontWeight="medium"
            >
              /day
            </Text>
          </Box>
        </Flex>

        {/* Features */}
        <HStack
          justify="space-between"
          mt="4"
          pt="4"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <Stack align="center" gap="2">
            <Box
              p="2"
              rounded="lg"
              bg="rgba(13, 148, 136, 0.08)"
              border="1px solid"
              borderColor="rgba(13, 148, 136, 0.1)"
            >
              <Users size={18} color="#0D9488" />
            </Box>
            <Text fontSize="sm" color="#64748B" fontWeight="medium">
              {seats} Seats
            </Text>
          </Stack>

          <Stack align="center" gap="2">
            <Box
              p="2"
              rounded="lg"
              bg="rgba(13, 148, 136, 0.08)"
              border="1px solid"
              borderColor="rgba(13, 148, 136, 0.1)"
            >
              <Gauge size={18} color="#0D9488" />
            </Box>
            <Text fontSize="sm" color="#64748B" fontWeight="medium">
              {transmission}
            </Text>
          </Stack>

          <Stack align="center" gap="2">
            <Box
              p="2"
              rounded="lg"
              bg="rgba(13, 148, 136, 0.08)"
              border="1px solid"
              borderColor="rgba(13, 148, 136, 0.1)"
            >
              <Star size={18} color="#0D9488" />
            </Box>
            <Text fontSize="sm" color="#64748B" fontWeight="medium">
              {rating}/5
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Box>
  )
}