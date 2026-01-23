"use client";

import KycVerificationCard from "@/components/cards/KycVerificationCard";
import RecentBookingsCard from "@/components/dashboard/user/RecentBookingsCard";
import { Form } from "@/components/Form/Form";
import { FormInput } from "@/components/Form/FormInput";
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
} from "@chakra-ui/react";
import { CheckCircle, Camera, User } from "lucide-react";
import { useRef, useState } from "react";

export default function ProfileCard() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>("");

    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        avatar: "",
        phone: "",
    });

    return (
        <Box>
            {/* ================= PROFILE HEADER ================= */}
            <Box bg="white" rounded="2xl" border="1px solid" borderColor="gray.200" p={6}>
                <Flex
                    gap={6}
                    align={{ base: "start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                >
                    {/* AVATAR */}
                    <Box position="relative" mx={{ base: "auto", md: "0" }}>
                        <Avatar.Root size="2xl">
                            <Avatar.Image src={avatar || undefined} />
                            <Avatar.Fallback name="Alex Rivers" />
                        </Avatar.Root>

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
                                    Alex Rivers
                                </Text>
                                <Badge colorPalette="yellow" rounded="full" px={2} fontSize="xs">
                                    Verification Pending
                                </Badge>
                            </HStack>

                            <Text fontSize="sm" color="gray.500">
                                Premium Member · Joined Oct 2023
                            </Text>

                            <HStack mt={2} flexWrap="wrap" gap={3}>
                                <HStack color="teal.600">
                                    <Icon as={CheckCircle} boxSize={4} />
                                    <Text fontSize="xs">Identity Verified</Text>
                                </HStack>

                                <HStack color="gray.400">
                                    <Icon as={CheckCircle} boxSize={4} />
                                    <Text fontSize="xs">Phone Verified</Text>
                                </HStack>
                            </HStack>
                        </VStack>

                        <Button
                            size="sm"
                            rounded="full"
                            bg="gray.100"
                            _hover={{ bg: "gray.200" }}
                            alignSelf={{ base: "flex-start", md: "center" }}
                        >
                            Edit Profile
                        </Button>
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
                                    placeholder="alex@email.com"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />
                            </SimpleGrid>

                            <FormInput
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                placeholder="(123) 456-7890"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
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
