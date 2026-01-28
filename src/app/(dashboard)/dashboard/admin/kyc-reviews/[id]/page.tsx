"use client";

import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import {
    Box, VStack, Heading, Text, Badge, SimpleGrid,
    Image, Button, Flex, IconButton, Separator,
    Container, HStack, Center, Spinner, Stack
} from "@chakra-ui/react";
import {
    ArrowLeft, ShieldCheck, Mail, Calendar,
    ExternalLink, UserCheck, UserX, Fingerprint, Ban
} from "lucide-react";

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;
    const utils = trpc.useUtils();

    const { data: user, isLoading } = trpc.user.getUserDetails.useQuery({ userId });

    const updateKyc = trpc.user.updateKycStatus.useMutation({
        onSuccess: () => {
            utils.user.getUserDetails.invalidate({ userId });
            utils.user.getAllUsersKyc.invalidate();
        }
    });

    // Reject KYC Mutation
    const rejectKyc = trpc.user.rejectKycDocuments.useMutation({
        onSuccess: () => {
            utils.user.getUserDetails.invalidate({ userId });
            utils.user.getAllUsersKyc.invalidate();
        }
    });

    const handleRejection = (userId: string) => {
        rejectKyc.mutate({ userId });
    }

    if (isLoading) return (
        <Center h="70vh">
            <Spinner size="xl" color="emerald.500" />
        </Center>
    );

    if (!user) return (
        <Center h="70vh">
            <VStack>
                <Heading size="lg">User not found</Heading>
                <Button onClick={() => router.back()} variant="outline">Go Back</Button>
            </VStack>
        </Center>
    );

    const isVerified = user.isIdentityVerified;




    return (
        <Container maxW="1200px" py={10}>
            {/* Header / Navigation */}
            <Flex justify="space-between" align="center" mb={10}>
                <HStack gap={4}>
                    <IconButton
                        aria-label="Back"
                        rounded="full"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={20} />
                    </IconButton>
                    <VStack align="start" gap={0}>
                        <Text fontSize="xs" color="gray.400" fontWeight="bold" letterSpacing="widest">ADMIN PANEL</Text>
                        <Heading size="lg" letterSpacing="tight" fontWeight="900">User Profile</Heading>
                    </VStack>
                </HStack>

                <HStack gap={3}>
                    {/* Only show Reject if not currently verified */}
                    {!isVerified && (
                        <Button
                            colorPalette="red"
                            rounded="xl"
                            size="lg"
                            // Logic: You can use a mutation here to clear the KYC array or notify user
                            onClick={() => handleRejection(userId)}
                        >
                            Reject Documents
                        </Button>
                    )}

                    <Button
                        colorPalette={isVerified ? "red" : "green"}
                        rounded="xl"
                        size="lg"
                        // @ts-ignore
                        isLoading={updateKyc?.isLoading}
                        onClick={() => updateKyc.mutate({ userId, verified: !isVerified })}
                    >
                        {isVerified ? "Revoke Access" : "Approve Identity"}
                    </Button>
                </HStack>
            </Flex>

            <Flex direction={{ base: "column", lg: "row" }} gap={10} align="start">

                {/* Left Sidebar */}
                <Box
                    w={{ base: "full", lg: "350px" }}
                    bg="white"
                    rounded="3xl"
                    p={8}
                    border="1px solid"
                    borderColor="gray.200"
                    position="sticky"
                    top="20px"
                >
                    <VStack align="center">
                        <Box
                            position="relative"
                            p={1}
                            rounded="full"
                            border="1px solid"
                            borderColor={isVerified ? "emerald.200" : "orange.200"}
                        >
                            <Center w="100px" h="100px" bg="gray.50" rounded="full">
                                <Fingerprint size={48} className={isVerified ? "text-emerald-500" : "text-orange-400"} />
                            </Center>
                        </Box>

                        <VStack gap={1} textAlign="center">
                            <Heading size="md" fontWeight="900">{user.name || "Unnamed User"}</Heading>
                            <Text color="gray.500" fontSize="sm">{user.email}</Text>
                        </VStack>

                        <Badge
                            size="lg"
                            variant="surface"
                            colorPalette={isVerified ? "emerald" : "orange"}
                            rounded="full"
                            px={4}
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            {isVerified ? "Verified" : "Pending Review"}
                        </Badge>

                        <Separator borderColor="gray.100" />

                        <VStack align="stretch" w="full" gap={4}>
                            <HStack justify="space-between">
                                <HStack color="gray.400">
                                    <Mail size={14} />
                                    <Text fontSize="2xs" fontWeight="black">EMAIL</Text>
                                </HStack>
                                <Text fontSize="xs" fontWeight="bold">{user.email}</Text>
                            </HStack>

                            <HStack justify="space-between">
                                <HStack color="gray.400">
                                    <Calendar size={14} />
                                    <Text fontSize="2xs" fontWeight="black">JOINED</Text>
                                </HStack>
                                <Text fontSize="xs" fontWeight="bold">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Main Content */}
                <Box flex={1} w="full">
                    <VStack align="stretch" gap={6}>
                        <Box bg="gray.50" p={8} rounded="3xl" border="1px solid" borderColor="gray.100">
                            <HStack justify="space-between" mb={8}>
                                <VStack align="start" gap={0}>
                                    <Heading size="md" fontWeight="900">Identity Documents</Heading>
                                    <Text fontSize="sm" color="gray.500">Cross-reference images with user profile</Text>
                                </VStack>
                                <Badge variant="outline" colorPalette="gray" rounded="md">{user.kyc?.length || 0} Files</Badge>
                            </HStack>

                            {user.kyc && user.kyc.length > 0 ? (
                                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                                    {user.kyc.map((url, index) => (
                                        <Box
                                            key={index}
                                            bg="white"
                                            p={4}
                                            rounded="2xl"
                                            border="1px solid"
                                            borderColor="gray.200"
                                            transition="all 0.2s"
                                            _hover={{ borderColor: "emerald.400" }}
                                        >
                                            <Flex justify="space-between" align="center" mb={4}>
                                                <Badge variant="subtle" size="sm" rounded="md">
                                                    {index === 0 ? "FRONT SIDE" : "BACK SIDE"}
                                                </Badge>
                                                <IconButton
                                                    size="xs" 
                                                    onClick={() => window.open(url, "_blank")}
                                                    aria-label="View original"
                                                >
                                                    <ExternalLink size={14} />
                                                </IconButton>
                                            </Flex>

                                            <Box rounded="xl" overflow="hidden" bg="gray.50" height="260px" border="1px solid" borderColor="gray.100">
                                                <Image
                                                    src={url}
                                                    alt="KYC Document"
                                                    w="full"
                                                    h="full"
                                                    objectFit="contain"
                                                    p={2}

                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            ) : (
                                <Center p={20} bg="white" rounded="3xl" border="2px dashed" borderColor="gray.200">
                                    <VStack gap={3}>
                                        <ShieldCheck size={40} strokeWidth={1} className="text-gray-300" />
                                        <Text color="gray.400" fontSize="sm" fontWeight="bold">NO DOCUMENTS UPLOADED</Text>
                                    </VStack>
                                </Center>
                            )}
                        </Box>

                        <Box p={8} bg="emerald.900" rounded="3xl" color="white" border="1px solid" borderColor="emerald.800">
                            <HStack justify="space-between">
                                <VStack align="start" gap={1}>
                                    <Text fontSize="2xs" fontWeight="black" opacity={0.5} letterSpacing="widest">COMPLIANCE STATUS</Text>
                                    <Text fontSize="sm" fontWeight="bold">
                                        {isVerified
                                            ? "Account is fully verified and cleared for premium bookings."
                                            : "Documents pending manual validation by an administrative officer."}
                                    </Text>
                                </VStack>
                                <ShieldCheck size={32} opacity={0.4} />
                            </HStack>
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </Container>
    );
}