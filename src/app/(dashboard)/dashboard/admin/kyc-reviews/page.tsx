"use client";

import {
    Box,
    Table,
    Heading,
    Badge,
    Button,
    Text,
    VStack,
    HStack,
    Spinner,
    Center
} from "@chakra-ui/react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { User, ChevronRight, Mail } from "lucide-react";

export default function AdminUsersList() {
    const router = useRouter();
    const { data: users, isLoading } = trpc.user.getAllUsersKyc.useQuery();

    if (isLoading) {
        return (
            <Center h="70vh">
                <VStack gap={4}>
                    <Spinner size="xl" color="emerald.500" />
                    <Text fontWeight="medium" color="gray.500">Loading Directory...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
            <HStack justify="space-between" mb={8}>
                <VStack align="start" gap={1}>
                    <Heading size="2xl" fontWeight="900" letterSpacing="tight">
                        User Management
                    </Heading>
                    <Text color="gray.500">Review and verify marketplace members.</Text>
                </VStack>
                <Badge size="lg" colorPalette="emerald" variant="surface" rounded="md">
                    {users?.length || 0} Total Users
                </Badge>
            </HStack>

            <Box
                bg="white"
                overflow="hidden"
            >
                <Table.Root      >
                    <Table.Header bg="white">
                        <Table.Row bg={"white"}>
                            <Table.ColumnHeader color="gray.600" fontWeight="bold">User Information</Table.ColumnHeader>
                            <Table.ColumnHeader color="gray.600" fontWeight="bold">KYC Status</Table.ColumnHeader>
                            <Table.ColumnHeader color="gray.600" fontWeight="bold"> </Table.ColumnHeader>


                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {users?.map((u) => (
                            <Table.Row key={u.id} bg={"white"} _hover={{ bg: "gray.50/50" }}>
                                <Table.Cell>
                                    <HStack gap={3}>
                                        <Box p={2} bg="gray.100" rounded="full">
                                            <User size={18} className="text-gray-600" />
                                        </Box>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="bold" fontSize="md">{u.name || "Guest User"}</Text>
                                            <HStack gap={1} color="gray.500">
                                                <Mail size={12} />
                                                <Text fontSize="xs">{u.email}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </Table.Cell>

                                <Table.Cell>
                                    <Badge
                                        variant="subtle"
                                        colorPalette={u.isKycUploaded ? "blue" : "gray"}
                                        rounded="full"
                                        px={3}
                                    >
                                        {u.isKycUploaded ? "Uploaded" : "No Docs"}
                                    </Badge>
                                </Table.Cell>



                                <Table.Cell textAlign="end">
                                    <Button
                                        variant="surface"
                                        size="sm"
                                        fontWeight="bold"
                                        onClick={() => router.push(`/dashboard/admin/kyc-reviews/${u.id}`)}
                                    >
                                        Review <ChevronRight size={16} />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
}