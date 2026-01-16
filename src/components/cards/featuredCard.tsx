"use client"

import { Box, Image, Text, Badge, Flex, Stack, Card, Icon } from "@chakra-ui/react"
import { Users } from "lucide-react"

interface CarCardProps {
  name: string
  image: string
  price: number
  seats: number
  type: string // e.g., "Luxury", "SUV"
}

export function FeaturedCard({ name, image, price, seats, type }: CarCardProps) {
  return (
    <Card.Root maxW="sm" overflow="hidden" rounded="2xl" border="none" shadow="md" transition="all 0.3s" _hover={{ shadow: "xl", transform: "translateY(-4px)" }}>
      <Box position="relative">
        {/* Badge at top */}
        <Badge
          position="absolute"
          top="4"
          left="4"
          colorPalette="teal"
          variant="solid"
          rounded="full"
          px="3"
        >
          {type}
        </Badge>

        <Image
          src={image}
          alt={name}
          h="200px"
          w="full"
          objectFit="cover"
        />
      </Box>

      <Card.Body p="5">
        <Flex justify="space-between" align="center" mb="2">
          <Text fontWeight="bold" fontSize="xl" letterSpacing="tight">
            {name}
          </Text>
          <Text fontWeight="extrabold" fontSize="xl" color="teal.600">
            ${price}<Text as="span" fontSize="xs" color="gray.500" fontWeight="medium">/day</Text>
          </Text>
        </Flex>

        <Flex align="center" gap="2" color="gray.500">
          <Users size={16} />
          <Text fontSize="sm">{seats} Seats</Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}