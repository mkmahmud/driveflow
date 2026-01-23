"use client"

import { Form } from "@/components/Form/Form";
import { FormInput } from "@/components/Form/FormInput";
import { toaster } from "@/components/ui/toaster";
import { trpc } from "@/trpc/client";
import {
    Box, Stack, Text, Heading, HStack,
    Button, Flex, Separator,
    SimpleGrid, Circle,
    Alert
} from "@chakra-ui/react"
import { Lock, ShieldCheck, KeyRound } from "lucide-react"
import { useState } from "react";

export default function SettingsContent() {




    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });


    // trpc mutations
    // Change password
    const changePasswordMutation = trpc.user.changePassword.useMutation({
        onSuccess: () => {
            toaster.create({
                title: "Password updated",
                description: "Your security credentials have been refreshed.",
                type: "success",
            });
            // Clear form on success
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        },
        onError: (err) => {
            toaster.create({
                title: "Update failed",
                description: err.message,
                type: "error",
            });
        }
    });

    const handleSubmit = async () => {
        if (isInvalid) return;
        await changePasswordMutation.mutateAsync({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        });
    }


    // Password not matched
    const isPasswordMismatch = form.newPassword !== form.confirmPassword;
    const isInvalid = isPasswordMismatch || form.newPassword.length < 8;

    return (
        <Stack gap="10" w="full" maxW="4xl">



            {/*  CHANGE PASSWORD --- */}
            <Box>
                <HStack gap="3" mb="6">
                    <Circle size="10" bg="orange.50" color="orange.600">
                        <KeyRound size={20} />
                    </Circle>
                    <Box>
                        <Heading size="md" fontWeight="bold">Security & Password</Heading>
                        <Text fontSize="xs" color="gray.500">Manage your password and account protection.</Text>
                    </Box>
                </HStack>

                <Stack maxW="lg" gap="6" p="6" bg="white" rounded="3xl" border="1px solid" borderColor="gray.100">
                    {/* 2. Show a global error alert if the mutation fails */}
                    {changePasswordMutation.isError && (
                        <Alert.Root status="error" variant="subtle" rounded="xl">
                            <Alert.Indicator />
                            <Alert.Content>
                                <Alert.Title fontSize="sm">
                                    {changePasswordMutation.error.message}
                                </Alert.Title>
                            </Alert.Content>
                        </Alert.Root>
                    )}

                    <Form onSubmit={() => handleSubmit}>

                        <FormInput
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            value={form.currentPassword}
                            onChange={(e) =>
                                setForm({ ...form, currentPassword: e.target.value })
                            }
                        />



                        <FormInput
                            label="New Password"
                            name="newPassword"
                            type="password"
                            placeholder="••••••••"
                            value={form.newPassword}
                            onChange={(e) =>
                                setForm({ ...form, newPassword: e.target.value })
                            }
                        />
                        <FormInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                        />
                        {
                            isPasswordMismatch && form.confirmPassword.length > 0 ? (
                                <Text fontSize="xs" color="red.500" mb="2">
                                    New password  do not match.
                                </Text>
                            ) : null
                        }

                        <Flex justify="space-between" align="center">
                            <Text fontSize="xs" color="gray.500" maxW="300px">
                                Make sure your new password is at least 8 characters long and includes numbers.
                            </Text>
                            <Button
                                loading={changePasswordMutation.isPending}
                                disabled={isInvalid || changePasswordMutation.isPending}
                                variant="surface"
                                rounded="xl"
                                h="11"
                                px="8"
                                fontWeight="bold"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                            </Button>
                        </Flex>

                    </Form>


                </Stack>
            </Box>
        </Stack>
    )
}

