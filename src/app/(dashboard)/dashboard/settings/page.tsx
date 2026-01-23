"use client"

import { Form } from "@/components/Form/Form";
import { FormInput } from "@/components/Form/FormInput";
import {
    Box, Stack, Text, Heading, HStack,
    Button, Flex, Separator,
    SimpleGrid, Circle
} from "@chakra-ui/react"
import { Lock, ShieldCheck, KeyRound } from "lucide-react"
import { useState } from "react";

export default function SettingsContent() {


    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    return (
        <Stack gap="10" w="full" maxW="4xl">



            {/* --- SECTION 2: CHANGE PASSWORD --- */}
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


                    <Form onSubmit={() => console.log(form)}>

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
 

                        <Flex justify="space-between" align="center">
                            <Text fontSize="xs" color="gray.500" maxW="300px">
                                Make sure your new password is at least 8 characters long and includes numbers.
                            </Text>
                            <Button variant="outline" colorPalette="teal" rounded="xl" h="11" px="8" fontWeight="bold">
                                Update Password
                            </Button>
                        </Flex>

                    </Form>


                </Stack>
            </Box>
        </Stack>
    )
}

