"use client"

import {
    Box, Grid, Stack, Text, Heading, HStack,
    Image, Button, Badge
} from "@chakra-ui/react"
import { Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import AddToWishlist from "@/components/cards/addToWishlist"

export default function WishlistsPage() {
    // Get My Wishlists
    const { data: wishlist, isLoading } = trpc.wishlist.getAllWishlist.useQuery()

    return (
        <Stack gap="10" w="full" py="4">
            {/* Header Section */}
            <Box>
                <Heading size="xl" fontWeight="900" letterSpacing="tight">
                    My Wishlist
                </Heading>
                <Text color="gray.500" fontSize="md" mt="1">
                    You have {wishlist?.length} vehicles saved for your next trip.
                </Text>
            </Box>
            {/* @ts-ignore */}
            {!isLoading && wishlist?.length > 0 ? (
                <Grid gap="6">
                    {wishlist?.map((car) => (
                        <Box
                            key={car.id}
                            className="group relative bg-white border border-gray-100 rounded-[24px] overflow-hidden transition-all hover:border-teal-500 hover:shadow-xl flex justify-between"
                        > {/* Details Section */}
                            <Box className="flex">
                                {/* Image Section */}
                                <Box h="100px" overflow="hidden" position="relative" w="200px">
                                    <Image
                                        src={car.car.image}
                                        alt={car.car.name}
                                        w="full"
                                        h="full"
                                        objectFit="cover"
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <Badge
                                        position="absolute"
                                        bottom="4"
                                        left="4"
                                        colorPalette="teal"
                                        variant="solid"
                                        borderRadius="md"
                                    >
                                        {car.car.type}
                                    </Badge>
                                </Box>


                                <Box className="p-4">
                                    <Heading size="md" fontWeight="800">{car.car.name}</Heading>
                                    <HStack gap="1" color="gray.500" mt="1">
                                        <MapPin size={14} />
                                        <Text fontSize="xs" fontWeight="bold">{car.car.location}</Text>
                                    </HStack>
                                    <HStack gap="0">
                                        <Text fontSize="lg" fontWeight="900" color="teal.600">${car.car.pricePerDay}</Text>
                                        <Text fontSize="xs" color="gray.400" fontWeight="bold">/day</Text>
                                    </HStack>
                                </Box>




                            </Box>

                            <Box className="flex items-center mr-10">
                                <AddToWishlist carId={car.car.id} />
                            </Box>
                        </Box>
                    ))}
                </Grid>
            ) : (
                <Stack align="center" justify="center" h="400px" border="2px dashed" borderColor="gray.100" rounded="3xl" bg="gray.50/50">
                    <Heart size={48} color="#E2E8F0" />
                    <Text fontWeight="bold" color="gray.400">Your wishlist is empty</Text>
                    {/* @ts-ignore */}
                    <Button as={Link} href="/search" variant="link" colorPalette="teal">Explore cars</Button>
                </Stack>
            )}
        </Stack>
    )
}