"use client"

import {
    Box, Button, Flex, Heading, Input, Stack, Text,
    HStack, Separator, Center, Link
} from "@chakra-ui/react"
import {
    DialogBody, DialogCloseTrigger, DialogContent,
    DialogHeader, DialogRoot, DialogTitle
} from "@/components/ui/dialog"
import { InputGroup } from "@/components/ui/input-group"
import { Mail, Lock, Chrome, Github, Facebook, User } from "lucide-react"
import { useState } from "react"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
    const [isLoading, setIsLoading] = useState(false)

    // 1. Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // 2. Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // 3. Form Submission Logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate an API call
        setTimeout(() => {
            console.log("--- Form Submitted ---")
            console.log("Mode:", authMode)
            console.log("Data:", formData)
            console.log("----------------------")

            setIsLoading(false)
            alert(`${authMode === 'signin' ? 'Signed in' : 'Registered'} successfully! Check console for data.`)
            onClose() // Close modal after logging
        }, 1000)
    }

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="md" placement="center">
            <DialogContent rounded="2xl" p="4" as="form" onSubmit={handleSubmit}>
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
                        {/* Social Logins */}
                        <Stack gap="3">
                            <Button variant="outline" w="full" rounded="xl" gap="3" type="button">
                                <Chrome size={20} /> Continue with Google
                            </Button>
                        </Stack>

                        <HStack>
                            <Separator flex="1" />
                            <Text fontSize="xs" color="gray.400">OR</Text>
                            <Separator flex="1" />
                        </HStack>

                        {/* Fields */}
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
                                    onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
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