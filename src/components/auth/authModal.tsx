"use client"

import {
    Box, Button, Input, Stack, Text,
    HStack, Separator, Center, Link, Spinner
} from "@chakra-ui/react"
import {
    DialogBody, DialogCloseTrigger, DialogContent,
    DialogHeader, DialogRoot, DialogTitle
} from "@/components/ui/dialog"
import { InputGroup } from "@/components/ui/input-group"
import { Mail, Lock, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { trpc } from "@/trpc/client"
import { useAuth } from "@/hooks/useAuth"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const googleButtonRef = useRef<HTMLDivElement>(null)

    // TRPC & AUTH UTILITIES
    const utils = trpc.useUtils()
    const { refreshUser } = useAuth()

    // FORM DATA STATE
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // --- MUTATIONS ---
    // Signup
    const signupMutation = trpc.auth.signup.useMutation({
        onSuccess: () => {
            setAuthMode("signin")
            setErrorMessage(null)
            alert("Account created successfully!")
        },
        onError: (err) => setErrorMessage(err.message)
    })
    // Login
    const loginMutation = trpc.auth.login.useMutation({
        onSuccess: async () => {
            await utils.auth.me.invalidate()
            await refreshUser()
            onClose()
        },
        onError: (err) => setErrorMessage(err.message)
    })
    // Google Auth
    const googleMutation = trpc.auth.googleAuth.useMutation({
        onSuccess: async () => {
            await utils.auth.me.invalidate()
            await refreshUser()
            onClose()
        },
        onError: (err) => setErrorMessage(err.message)
    })

    // Derived Loading States
    const isEmailLoading = loginMutation.isPending || signupMutation.isPending;
    const isGoogleLoading = googleMutation.isPending;
    const isAnyLoading = isEmailLoading || isGoogleLoading;

    useEffect(() => {
        if (!isOpen) return;

        const renderGoogleButton = () => {
            const google = (window as any).google;
            if (google && googleButtonRef.current) {
                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    callback: (response: any) => {
                        googleMutation.mutate({ token: response.credential });
                    },
                    use_fedcm_for_prompt: false
                });

                google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    width: 340,
                    text: "continue_with",
                    shape: "rectangular",

                });
            }
        };

        renderGoogleButton();

        const interval = setInterval(() => {
            if (googleButtonRef.current?.innerHTML === "") {
                renderGoogleButton();
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isOpen, authMode, googleMutation]);

    // FORM SUBMISSION HANDLER
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isAnyLoading) return;
        setErrorMessage(null)

        if (authMode === "signup") {
            signupMutation.mutate(formData)
        } else {
            loginMutation.mutate({
                email: formData.email,
                password: formData.password
            })
        }
    }

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="md" placement="center">
            <DialogContent rounded="2xl" p="4" as="form" bg="white" onSubmit={handleSubmit}>
                <DialogCloseTrigger disabled={isAnyLoading} />
                <DialogHeader>
                    <Center flexDirection="column" gap="1" mb="2" w="full">
                        <DialogTitle fontSize="2xl" fontWeight="black">
                            {authMode === "signin" ? "Welcome Back" : "Create Account"}
                        </DialogTitle>
                    </Center>
                </DialogHeader>

                <DialogBody>
                    <Stack gap="4">
                        {errorMessage && (
                            <Box bg="red.50" p="3" rounded="xl" border="1px solid" borderColor="red.100">
                                <Text color="red.600" fontSize="xs">{errorMessage}</Text>
                            </Box>
                        )}

                        {/* GOOGLE BUTTON CONTAINER */}
                        <Box
                            w="full"
                            py="2"
                            opacity={isEmailLoading ? 0.5 : 1}
                            pointerEvents={isAnyLoading ? "none" : "auto"}
                        >
                            <div
                                id="google-signin-div"
                                ref={googleButtonRef}
                                style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '44px' }}
                            />
                            {isGoogleLoading && (
                                <HStack justify="center" mt="2" color="teal.600">
                                    <Spinner size="xs" />
                                    <Text fontSize="xs" fontWeight="bold">Syncing Google Profile...</Text>
                                </HStack>
                            )}
                        </Box>

                        <HStack w="full">
                            <Separator flex="1" />
                            <Text fontSize="2xs" color="gray.400" fontWeight="bold">OR EMAIL</Text>
                            <Separator flex="1" />
                        </HStack>

                        <Stack gap="3">
                            {authMode === "signup" && (
                                <InputGroup w="full" startElement={<User size={16} />}>
                                    <Input
                                        disabled={isAnyLoading}
                                        name="name"
                                        placeholder="Full Name"
                                        variant="flushed"
                                        h="11"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </InputGroup>
                            )}
                            <InputGroup w="full" startElement={<Mail size={16} />}>
                                <Input
                                    disabled={isAnyLoading}
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    variant="flushed"
                                    h="11"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </InputGroup>
                            <InputGroup w="full" startElement={<Lock size={16} />}>
                                <Input
                                    disabled={isAnyLoading}
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    variant="flushed"
                                    h="11"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </InputGroup>

                            <Button
                                type="submit"
                                colorPalette="teal"
                                h="11"
                                rounded="xl"
                                fontWeight="bold"
                                loading={isEmailLoading}
                                disabled={isGoogleLoading}
                            >
                                {authMode === "signin" ? "Sign In" : "Register"}
                            </Button>
                        </Stack>

                        <Center mt="4">
                            <Text fontSize="xs">
                                <Link
                                    onClick={() => !isAnyLoading && setAuthMode(authMode === "signin" ? "signup" : "signin")}
                                    color={isAnyLoading ? "gray.400" : "teal.600"}
                                    fontWeight="black"
                                    cursor={isAnyLoading ? "not-allowed" : "pointer"}
                                >
                                    {authMode === "signin" ? "Create an account" : "Sign in instead"}
                                </Link>
                            </Text>
                        </Center>
                    </Stack>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}