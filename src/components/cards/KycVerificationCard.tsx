"use client";

import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Badge,
    Image,
    Flex,
} from "@chakra-ui/react";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import KycUploadInput from "../Form/KycUploadInput";

export default function KycVerificationCard() {
    const [front, setFront] = useState<File | null>(null);
    const [back, setBack] = useState<File | null>(null);

    const handleSubmit = () => {
        if (!front || !back) {
            alert("Upload both sides");
            return;
        }

        // Ready for API
        const formData = new FormData();
        formData.append("front", front);
        formData.append("back", back);

        console.log("Submitted", formData);
    };

    return (
        <Box
            maxW="360px"
            p="6"
            rounded="2xl"
            className="bg-gradient-to-b from-emerald-800 to-emerald-900"
            color="white"
        >
            <VStack align="stretch" >
                {/* Header */}

                <Flex mb="4" align="center" justifyContent="space-between" gap="2">
                    <ShieldCheck size={32} className="text-emerald-300" />
                    <Box>
                        <Badge
                            colorScheme="whiteAlpha"
                            rounded="full"
                            px="3"
                            mb="3"
                        >
                            KYC STATUS
                        </Badge>

                        <Text fontWeight="bold" fontSize="lg">
                            In Review
                        </Text>
                    </Box>
                </Flex>





                <Heading size="xl">
                    Complete Your Identity Verification
                </Heading>

                <Text fontSize="sm" color="emerald.200">
                    To unlock premium bookings and high-value insurance coverage,
                    we need a clear scan of your official driver’s license.
                </Text>

                {/* Upload fields */}
                <VStack mt="6" >
                    <KycUploadInput
                        label="License Front"
                        file={front}
                        onChange={setFront}
                    />

                    {front && (
                        <Image
                            src={URL.createObjectURL(front)}
                            alt="Front preview"
                            rounded="lg"
                            maxH="120px"
                            objectFit="cover"
                        />
                    )}

                    <KycUploadInput
                        label="License Back"
                        file={back}
                        onChange={setBack}
                    />

                    {back && (
                        <Image
                            src={URL.createObjectURL(back)}
                            alt="Back preview"
                            rounded="lg"
                            maxH="120px"
                            objectFit="cover"
                        />
                    )}
                </VStack>

                <Button
                    mt="4"
                    rounded="full"
                    size="lg"
                    bg="white"
                    color="emerald.700"
                    fontWeight="bold"
                    _hover={{ bg: "emerald.50" }}
                    onClick={handleSubmit}
                >
                    Submit for Review →
                </Button>
            </VStack>
        </Box>
    );
}
