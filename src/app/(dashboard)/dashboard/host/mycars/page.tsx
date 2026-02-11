"use client"

import { trpc } from "@/trpc/client";
import {
  Box, Button, Container, Flex, Heading, Text,
  SimpleGrid, Badge, Image, Stack, Icon,
  Float, Skeleton,
  IconButton,
  Dialog
} from "@chakra-ui/react"
import {
  Plus, Trash2, MapPin, Fuel, ShieldCheck, Settings,
  Star, AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MyCarsPage() {
  const utils = trpc.useContext();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: cars, isLoading } = trpc.car.getMyCars.useQuery();

  const deleteMutation = trpc.car.deleteCar.useMutation({
    onSuccess: () => {
      utils.car.getMyCars.invalidate();
      setDeleteId(null);
    }
  });

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate({ id: deleteId });
    }
  };

  if (isLoading) return <LoadingGrid />;

  return (
    <Box bg="gray.50" minH="100vh">
      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog.Root
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        placement="top"
        motionPreset="slide-in-top"
      >
        <Dialog.Backdrop bg="white/60" />
        <Dialog.Positioner top="10" p="0">
          <Dialog.Content
            roundedBottom="2xl"
            roundedTop="none"
            bg="white"
            maxW="2xl"
            w="full"
            p="10"
            shadow="sm"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap="8">

              {/* Left Side: Context */}
              <Stack gap="1" flex="1">
                <Heading size="md" fontWeight="900" letterSpacing="tight">
                  Remove vehicle listing?
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  Deleting <Text as="span" color="black" fontWeight="600">{cars?.find(c => c.id === deleteId)?.name}</Text> is permanent.
                </Text>
              </Stack>

              {/* Right Side: Actions */}
              <Flex gap="3" w={{ base: "full", md: "auto" }}>
                <Dialog.CloseTrigger asChild>
                  <Button
                    variant="ghost"
                    rounded="full"
                    px="8"
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.400"
                    _hover={{ color: "black", bg: "transparent" }}
                  >
                    Cancel
                  </Button>
                </Dialog.CloseTrigger>

                <Button
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.800" }}
                  rounded="full"
                  px="10"
                  fontWeight="bold"
                  fontSize="sm"
                  loading={deleteMutation.isPending}
                  onClick={confirmDelete}
                >
                  Delete Listing
                </Button>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Container maxW="7xl" py="12">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb="12">
          <Stack gap="1">
            <Heading size="4xl" fontWeight="900" letterSpacing="tight" color="gray.900">
              Your Garage
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Manage {cars?.length || 0} active listings and tracking performance.
            </Text>
          </Stack>

          <Button
            asChild
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            size="xl"
            rounded="2xl"
            px="8"
          >
            <Link href="/dashboard/host/add-new-car">
              <Plus size={20} className="mr-2" /> List New Vehicle
            </Link>
          </Button>
        </Flex>

        {/* The Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
          {cars?.map((car) => (
            <Box
              key={car.id}
              // @ts-ignore
              group="true"
              bg="white"
              rounded="3xl"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-2px)", borderColor: "teal.500" }}
            >
              <Box position="relative" h="240px">
                <Image
                  src={car.image}
                  alt={car.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
                <Float placement="top-start" ml="10" mt="8">
                  <Badge bg="white/90" backdropFilter="blur(8px)" color="black" rounded="lg" px="3" py="1" shadow="sm">
                    {car.type}
                  </Badge>
                </Float>

                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  p="4"
                  bgGradient="to-t"
                  gradientFrom="black/60"
                  gradientTo="transparent"
                >
                  <Flex align="center" gap="1" color="white">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <Text fontSize="sm" fontWeight="bold">4.9 (12 trips)</Text>
                  </Flex>
                </Box>
              </Box>

              <Stack p="6" gap="4">
                <Flex justify="space-between" align="start">
                  <Box maxW="70%">
                    <Heading size="md" fontWeight="800" mb="1" className="truncate">{car.name}</Heading>
                    <Flex align="center" gap="1" color="gray.500" fontSize="xs">
                      <MapPin size={12} /> {car.location}
                    </Flex>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="2xl" fontWeight="900" color="black" lineHeight="1">
                      ${car.pricePerDay}
                    </Text>
                    <Text fontSize="10px" color="gray.400" fontWeight="bold" letterSpacing="widest">PER DAY</Text>
                  </Box>
                </Flex>

                <SimpleGrid columns={3} p="3" bg="gray.50" rounded="2xl" textAlign="center">
                  <Stack gap="0">
                    <Icon as={Settings} size="lg" mx="auto" color="gray.400" />
                    <Text fontSize="10px" fontWeight="bold" mt="1">{car.transmission[0]}</Text>
                  </Stack>
                  <Stack gap="0" borderLeft="1px solid" borderRight="1px solid" borderColor="gray.200">
                    <Icon as={Fuel} size="lg" mx="auto" color="gray.400" />
                    <Text fontSize="10px" fontWeight="bold" mt="1">{car.fuelType}</Text>
                  </Stack>
                  <Stack gap="0">
                    <Icon as={ShieldCheck} size="lg" mx="auto" color="gray.400" />
                    <Text fontSize="10px" fontWeight="bold" mt="1">Insured</Text>
                  </Stack>
                </SimpleGrid>

                <Flex gap="3">
                  <Button flex="1" variant="surface" rounded="xl" h="12" fontWeight="bold" asChild>
                    <Link href={`/search/${car.id}`}>Details</Link>
                  </Button>
                  <Button
                    bg="black"
                    color="white"
                    _hover={{ bg: "teal.600" }}
                    flex="1"
                    rounded="xl"
                    h="12"
                    fontWeight="bold"
                  >
                    Edit Car
                  </Button>
                  <IconButton
                    aria-label="Delete"
                    variant="ghost"
                    colorPalette="red"
                    h="12"
                    w="12"
                    rounded="xl"
                    onClick={() => setDeleteId(car.id)}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Flex>
              </Stack>
              <Button
                w={"full"}
                bg="teal.600"
                color="white"
                flex="1"
                rounded="xl"
                h="12"
                fontWeight="bold"
              >

                <Link href={`/dashboard/host/mycars/bookings/${car.id}`}>

                  Manage
                  Bookings
                </Link>
              </Button>
            </Box>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  )
}

function LoadingGrid() {
  return (
    <Container maxW="7xl" py="12">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
        {[1, 2, 3].map(i => <Skeleton key={i} h="400px" rounded="3xl" />)}
      </SimpleGrid>
    </Container>
  )
}