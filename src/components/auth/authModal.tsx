"use client"

import {
    Box, Button, Input, Stack, Text,
    HStack, Separator, Center, Link
} from "@chakra-ui/react"
import {
    DialogBody, DialogCloseTrigger, DialogContent,
    DialogHeader, DialogRoot, DialogTitle
} from "@/components/ui/dialog"
import { InputGroup } from "@/components/ui/input-group"
import { Mail, Lock, Chrome, User } from "lucide-react"
import { useState } from "react"
import { trpc } from "@/trpc/client"
import { useAuth } from "@/hooks/useAuth"

// Ensure this path matches your trpc client init

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)


    const utils = trpc.useUtils();
    const { refreshUser } = useAuth();


    // 1. Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // 2. tRPC Mutations
    const signupMutation = trpc.auth.signup.useMutation({
        onSuccess: async (data: any) => {
            console.log("Signup success:", data)
            alert("Account created! Please sign in.")
            setAuthMode("signin")
            setErrorMessage(null)
        },

        onError: (err: any) => {
            setErrorMessage(err.message)
        }
    })

    const loginMutation = trpc.auth.login.useMutation({
        onSuccess: async (data: any) => {
            console.log("Login success:", data);

            // 2. Force tRPC to re-fetch the 'me' query globally
            // This ensures the Navbar sees the new user immediately
            await utils.auth.me.invalidate();

            // 3. Optional: Call your manual refresh if you have extra logic there
            await refreshUser();

            onClose();
        },
        onError: (err: any) => {
            setErrorMessage(err.message)
        }
    })

    // 3. Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage(null)

        if (authMode === "signup") {
            signupMutation.mutate({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        } else {
            loginMutation.mutate({
                email: formData.email,
                password: formData.password
            })
        }
    }

    // @ts-ignore
    const isLoading = signupMutation.isLoading || loginMutation.isLoading

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="md" placement="center" >
            <DialogContent rounded="2xl" p="4" as="form" bg="white" onSubmit={handleSubmit}>
                <DialogCloseTrigger />

                <DialogHeader>
                    <Center flexDirection="column" gap="2" mb="4" w="full">
                        <DialogTitle fontSize="2xl" fontWeight="black">
                            {authMode === "signin" ? "Welcome Back" : "Create Account"}
                        </DialogTitle>
                        <Text fontSize="sm" color="gray.500">
                            {authMode === "signin" ? "Enter your details to access your account" : "Join DriveFlow and start your journey"}
                        </Text>
                    </Center>
                </DialogHeader>

                <DialogBody>
                    <Stack gap="6">
                        {/* Error Message Display */}
                        {errorMessage && (
                            <Box bg="red.50" p="3" rounded="lg" border="1px solid" borderColor="red.200">
                                <Text color="red.600" fontSize="xs" fontWeight="medium">{errorMessage}</Text>
                            </Box>
                        )}

                        <Button variant="outline" w="full" rounded="xl" gap="3" type="button">
                            <Chrome size={20} /> Continue with Google
                        </Button>

                        <HStack>
                            <Separator flex="1" />
                            <Text fontSize="xs" color="gray.400">OR</Text>
                            <Separator flex="1" />
                        </HStack>

                        <Stack gap="4">
                            {authMode === "signup" && (
                                <InputGroup w="full" startElement={<User size={16} color="gray" />}>
                                    <Input
                                        name="name"
                                        placeholder="Full Name"
                                        variant="subtle"
                                        h="12"
                                        rounded="xl"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            )}

                            <InputGroup w="full" startElement={<Mail size={16} color="gray" />}>
                                <Input
                                    name="email"
                                    placeholder="Email Address"
                                    type="email"
                                    variant="subtle"
                                    h="12"
                                    rounded="xl"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>

                            <InputGroup w="full" startElement={<Lock size={16} color="gray" />}>
                                <Input
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    variant="subtle"
                                    h="12"
                                    rounded="xl"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>

                            <Button
                                type="submit"
                                colorPalette="teal"
                                h="12"
                                rounded="xl"
                                fontWeight="bold"
                                loading={isLoading}
                            >
                                {authMode === "signin" ? "Sign In" : "Register Now"}
                            </Button>
                        </Stack>

                        <Center mt="2">
                            <Text fontSize="sm">
                                {authMode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
                                <Link
                                    onClick={() => {
                                        setAuthMode(authMode === "signin" ? "signup" : "signin")
                                        setErrorMessage(null)
                                    }}
                                    color="primary"
                                    fontWeight="bold"
                                >
                                    {authMode === "signin" ? "Sign Up" : "Sign In"}
                                </Link>
                            </Text>
                        </Center>
                    </Stack>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}