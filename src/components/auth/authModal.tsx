"use client"

import {
    Box, Button, Input, Stack, Text,
    HStack, Separator, Center, Link, Spinner,
    Flex
} from "@chakra-ui/react"
import {
    DialogBody, DialogCloseTrigger, DialogContent,
    DialogHeader, DialogRoot, DialogTitle
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup } from "@/components/ui/input-group"
import { Mail, Lock, User, ShieldCheck } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { trpc } from "@/trpc/client"
import { useAuth } from "@/hooks/useAuth"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<"signin" | "signup" >("signin")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const googleButtonRef = useRef<HTMLDivElement>(null)

    // TRPC & AUTH UTILITIES
    const utils = trpc.useUtils()
    const { refreshUser } = useAuth()

    const [isHost, setIsHost] = useState(false);

    // FORM DATA STATE
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"  
    })

    // --- SYNC ROLE WITH FORM DATA ---
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            role: isHost ? "HOST" : "USER"
        }));
    }, [isHost]);

    // --- MUTATIONS ---
    const signupMutation = trpc.auth.signup.useMutation({
        onSuccess: () => {
            setAuthMode("signin")
            setErrorMessage(null)
            alert("Account created successfully!")
        },
        onError: (err) => setErrorMessage(err.message)
    })

    const loginMutation = trpc.auth.login.useMutation({
        onSuccess: async () => {
            await utils.auth.me.invalidate()
            await refreshUser()
            onClose()
        },
        onError: (err) => setErrorMessage(err.message)
    })

    const googleMutation = trpc.auth.googleAuth.useMutation({
        onSuccess: async () => {
            await utils.auth.me.invalidate()
            await refreshUser()
            onClose()
        },
        onError: (err) => setErrorMessage(err.message)
    })

    const isEmailLoading = loginMutation.isPending || signupMutation.isPending;
    const isGoogleLoading = googleMutation.isPending;
    const isAnyLoading = isEmailLoading || isGoogleLoading;

    // Google Auth Logic
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
            if (googleButtonRef.current?.innerHTML === "") renderGoogleButton();
            else clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [isOpen, authMode, googleMutation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isAnyLoading) return;
        setErrorMessage(null)

        if (authMode === "signup") {
             // @ts-ignore
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
            <DialogContent rounded="3xl" p="6" as="form" bg="white" onSubmit={handleSubmit} shadow="2xl">
                <DialogCloseTrigger disabled={isAnyLoading} rounded="full" />
                <DialogHeader>
                    <Center flexDirection="column" gap="1" mb="2" w="full">
                        <DialogTitle fontSize="3xl" fontWeight="900" letterSpacing="tight">
                            {authMode === "signin" ? "Welcome Back" : "Join the Club"}
                        </DialogTitle>
                        <Text color="gray.500" fontSize="sm">
                            {authMode === "signin" ? "Enter your details to sign in" : "Start your journey with us today"}
                        </Text>
                    </Center>
                </DialogHeader>

                <DialogBody>
                    <Stack gap="5">
                        {errorMessage && (
                            <Box bg="red.50" p="3" rounded="xl" border="1px solid" borderColor="red.100">
                                <Text color="red.600" fontSize="xs" fontWeight="bold">{errorMessage}</Text>
                            </Box>
                        )}

                        {/* GOOGLE BUTTON */}
                        <Box w="full" opacity={isEmailLoading ? 0.5 : 1} pointerEvents={isAnyLoading ? "none" : "auto"}>
                            <div ref={googleButtonRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
                        </Box>

                        <HStack w="full">
                            <Separator flex="1" />
                            <Text fontSize="10px" color="gray.400" fontWeight="black" letterSpacing="widest">OR EMAIL</Text>
                            <Separator flex="1" />
                        </HStack>

                        <Stack gap="4">
                            {authMode === "signup" && (
                                <>
                                    <InputGroup w="full" startElement={<User size={16} className="text-teal-600" />}>
                                        <Input
                                            disabled={isAnyLoading}
                                            placeholder="Full Name"
                                            variant="subtle"
                                            bg="gray.50"
                                            rounded="xl"
                                            h="12"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </InputGroup>

                                    {/* HOST TOGGLE CARD */}
                                    <Box
                                        p="4"
                                        rounded="2xl"
                                        bg={isHost ? "teal.50" : "gray.50"}
                                        border="1px solid"
                                        borderColor={isHost ? "teal.200" : "gray.100"}
                                        transition="all 0.2s"
                                        cursor="pointer"
                                        onClick={() => !isAnyLoading && setIsHost(!isHost)}
                                        _hover={{ borderColor: "teal.300" }}
                                    >
                                        <Flex align="center" gap="4">
                                            <Checkbox
                                                colorPalette="teal"
                                                checked={isHost}
                                                onCheckedChange={(e) => setIsHost(!!e.checked)}
                                            />
                                            <Stack gap="0">
                                                <HStack gap="1">
                                                    <Text fontSize="sm" fontWeight="bold" color={isHost ? "teal.900" : "gray.700"}>
                                                        Register as a Host
                                                    </Text>
                                                    {isHost && <ShieldCheck size={14} className="text-teal-600" />}
                                                </HStack>
                                                <Text fontSize="xs" color={isHost ? "teal.600" : "gray.500"}>
                                                    I want to list my cars and earn money
                                                </Text>
                                            </Stack>
                                        </Flex>
                                    </Box>
                                </>
                            )}

                            <InputGroup w="full" startElement={<Mail size={16} className="text-teal-600" />}>
                                <Input
                                    disabled={isAnyLoading}
                                    placeholder="Email Address"
                                    type="email"
                                    variant="subtle"
                                    bg="gray.50"
                                    rounded="xl"
                                    h="12"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </InputGroup>

                            <InputGroup w="full" startElement={<Lock size={16} className="text-teal-600" />}>
                                <Input
                                    disabled={isAnyLoading}
                                    placeholder="Password"
                                    type="password"
                                    variant="subtle"
                                    bg="gray.50"
                                    rounded="xl"
                                    h="12"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </InputGroup>

                            <Button
                                type="submit"
                                colorPalette="teal"
                                h="14"
                                rounded="2xl"
                                fontWeight="900"
                                fontSize="lg"
                                loading={isEmailLoading}
                                disabled={isGoogleLoading}
                               
                                _hover={{ transform: "translateY(-2px)", shadow: "sm" }}
                            >
                                {authMode === "signin" ? "Sign In" : "Create Account"}
                            </Button>
                        </Stack>

                        <Center mt="2">
                            <Text fontSize="sm" color="gray.500">
                                {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
                                <Link
                                    onClick={() => !isAnyLoading && setAuthMode(authMode === "signin" ? "signup" : "signin")}
                                    color="teal.600"
                                    fontWeight="900"
                                    textDecoration="underline"
                                    cursor={isAnyLoading ? "not-allowed" : "pointer"}
                                >
                                    {authMode === "signin" ? "Sign up" : "Log in"}
                                </Link>
                            </Text>
                        </Center>
                    </Stack>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}