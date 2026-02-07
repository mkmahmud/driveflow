import { trpc } from "@/trpc/client";
import { Box } from "@chakra-ui/react"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react";

export default function AddToWishlist({ carId }: { carId: string }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const { data: isWishlisted } = trpc.wishlist.checkIfWishlisted.useQuery({ carId })

    useEffect(() => {
        if (isWishlisted) {
            setIsFavorite(true)
        }
    }, [isWishlisted])

    // Add to Wishlist
    const { mutate: addToWishlist } = trpc.wishlist.addToWishlist.useMutation({
        onSuccess: () => {
            setIsFavorite(true)
        }
    })

    // Remove from Wishlist
    const { mutate: removeFromWishlist } = trpc.wishlist.removeFromWishlist.useMutation({
        onSuccess: () => {
            setIsFavorite(false)
        }
    })

    //Handle button click
    const handleWishlistButton = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFromWishlist({ carId })
        } else {
            addToWishlist({ carId })
        }
    }

    return (
        <Box
            onClick={handleWishlistButton}
            bg="white"
            p="2"
            rounded="full"
            shadow="md"
            color={isFavorite ? "red.500" : "gray.400"}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.1)", color: "red.500" }}
        >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </Box>
    )
}