"use client";

import KycVerificationCard from "@/components/cards/KycVerificationCard";
import RecentBookingsCard from "@/components/dashboard/user/RecentBookingsCard";
import { Form } from "@/components/Form/Form";
import { FormInput } from "@/components/Form/FormInput";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/trpc/client";
import {
    Box,
    Flex,
    Text,
    Badge,
    Button,
    HStack,
    VStack,
    Icon,
    Input,
    Avatar,
    Circle,
    Heading,
    Stack,
    SimpleGrid,
    Image,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { CheckCircle, Camera, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProfileCard() {
    // Get User 
    const { user } = useAuth();

    // format joining Date
    const joinedDate = user?.createdAt
        ? format(new Date(user.createdAt), "MMM yyyy")
        : "N/A";

    // File input ref
    const fileRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>(user?.image || "");

    // Get Trpc api
    const uploadImageMutation = trpc.user.uploadProfileImage.useMutation();
    const updateMutation = trpc.user.updateUserProfile.useMutation();

    const handleUpload = async (file: File) => {

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);

        try {

            const { signedUrl, publicUrl } = await uploadImageMutation.mutateAsync({
                fileName: file.name,
                fileType: file.type,
            });


            const uploadRes = await fetch(signedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadRes.ok) throw new Error("Failed to upload to S3");


            await updateMutation.mutateAsync({
                image: publicUrl,
            });

            console.log("Profile updated successfully!");
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };

    const [form, setForm] = useState({
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
    });


    useEffect(() => {
        try {

            updateMutation.mutate({
                name: form.name,
                phoneNumber: form.phoneNumber,
            });
            console.log("Profile updated successfully");

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }, [form])



    return (
        <Box>
            {/* ================= PROFILE HEADER ================= */}
            <Box bg="white" rounded="2xl" border="1px solid" borderColor="gray.200"  >
                <Flex
                    gap={6}
                    align={{ base: "start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                >
                    {/* AVATAR */}

                    <Box position="relative" mx={{ base: "auto", md: "0" }}>


                        <Image src={avatar || "/default-avatar.png"} alt="Profile Avatar" width={120} height={120} style={{ borderRadius: "0% 0% 20% 0%" }} />


                        <Button
                            size="xs"
                            rounded="full"
                            position="absolute"
                            bottom="0"
                            right="0"
                            colorPalette="teal"
                            onClick={() => fileRef.current?.click()}
                        >
                            <Camera size={14} />
                        </Button>

                        <Input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUpload(file);
                            }}
                        />
                    </Box>

                    {/* INFO */}
                    <Flex
                        flex="1"
                        justify="space-between"
                        align={{ base: "start", md: "center" }}
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, md: 0 }}
                        w="full"
                    >
                        <VStack align="start">
                            <HStack wrap="wrap">
                                <Text fontSize="lg" fontWeight="bold">
                                    {user?.name || "Unnamed User"}
                                </Text>
                                {
                                    user?.isKycUploaded && !user?.isIdentityVerified && (
                                        <Badge colorPalette="yellow" rounded="full" px={2} fontSize="xs">
                                            Verification Pending
                                        </Badge>
                                    )
                                }
                            </HStack>

                            <Text fontSize="sm" color="gray.500">
                                Joined {joinedDate}
                            </Text>

                            <HStack mt={2} flexWrap="wrap" gap={3}>
                                {
                                    user?.isIdentityVerified &&

                                    <HStack color="teal.600">
                                        <Icon as={CheckCircle} boxSize={4} />
                                        <Text fontSize="xs">Identity Verified</Text>
                                    </HStack>
                                }
                                {
                                    user?.phoneNumber &&
                                    <HStack color="gray.400">
                                        <Icon as={CheckCircle} boxSize={4} />
                                        <Text fontSize="xs">Phone Verified</Text>
                                    </HStack>
                                }
                            </HStack>
                        </VStack>


                    </Flex>
                </Flex>
            </Box>

            {/* ================= MAIN CONTENT ================= */}
            <Flex
                w="full"
                mt="8"
                gap="8"
                direction={{ base: "column", lg: "row" }}
                align="start"
            >
                {/* PERSONAL INFO FORM */}
                <Box flex="1" w="full">
                    <Form onSubmit={() => console.log(form)}>
                        <Stack
                            gap="6"
                            p="6"
                            bg="white"
                            rounded="3xl"
                            border="1px solid"
                            borderColor="gray.100"
                        >
                            <HStack gap="3">
                                <Circle size="10" bg="teal.50" color="teal.600">
                                    <User size={20} />
                                </Circle>
                                <Box>
                                    <Heading size="md">Personal Information</Heading>
                                    <Text fontSize="xs" color="gray.500">
                                        Update your profile details and how others see you.
                                    </Text>
                                </Box>
                            </HStack>

                            <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                                <FormInput
                                    label="Full Name"
                                    name="name"
                                    placeholder="Alex Rivers"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                />
                                <FormInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="alex@example.com"
                                    value={form.email}
                                    isDisabled={true}

                                />
                            </SimpleGrid>
                            <FormInput
                                label="Phone Number"
                                name="phoneNumber"
                                type="tel"
                                placeholder="(123) 456-7890"
                                value={form.phoneNumber}
                                onChange={(e) =>
                                    setForm({ ...form, phoneNumber: e.target.value })
                                }
                            />


                            <HStack justify="end">
                                <Button type="submit" colorPalette="teal">
                                    Save Changes
                                </Button>
                            </HStack>
                        </Stack>
                    </Form>
                    {/* Recent Booking */}
                    <Box mt={8}>
                        <RecentBookingsCard />
                    </Box>
                </Box>

                {/* KYC CARD */}
                <Box w="full" maxW={{ lg: "380px" }}>
                    <KycVerificationCard />
                </Box>
            </Flex>


        </Box>
    );
}
