"use client"

import {
    Box, Stack, Text, Heading, HStack, 
    Button, Flex, Avatar, Input, Separator, 
    SimpleGrid, Circle
} from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { User, Mail, Lock, Camera, ShieldCheck, KeyRound } from "lucide-react"
 
export default function SettingsContent() {
    return (
        <Stack gap="10" w="full" maxW="4xl">
            
            {/* --- SECTION 1: PERSONAL INFORMATION --- */}
            <Box>
                <HStack gap="3" mb="6">
                    <Circle size="10" bg="teal.50" color="teal.600">
                        <User size={20} />
                    </Circle>
                    <Box>
                        <Heading size="md" fontWeight="bold">Personal Information</Heading>
                        <Text fontSize="xs" color="gray.500">Update your profile details and how others see you.</Text>
                    </Box>
                </HStack>

                <Stack gap="6" p="6" bg="white" rounded="3xl" border="1px solid" borderColor="gray.100">
                    {/* Avatar Upload */}
                    <Flex align="center" gap="6" pb="4">
                        <Box position="relative">
                            <Avatar.Root size="2xl" border="4px solid" borderColor="white" shadow="md">
                                <Avatar.Fallback bg="teal.600" color="white" />
                                <Avatar.Image src="" />
                            </Avatar.Root>
                            <Circle 
                                position="absolute" bottom="0" right="0" 
                                bg="white" size="8" shadow="lg" border="1px solid" 
                                borderColor="gray.100" cursor="pointer"
                                _hover={{ bg: "gray.50" }}
                            >
                                <Camera size={14} className="text-teal-600" />
                            </Circle>
                        </Box>
                        <Stack gap="1">
                            <Text fontWeight="bold" fontSize="sm">Profile Photo</Text>
                            <Text fontSize="xs" color="gray.500">Click the icon to upload a new image.</Text>
                            <Button variant="outline" size="xs" colorPalette="teal" rounded="lg" mt="1" w="fit-content">Remove</Button>
                        </Stack>
                    </Flex>

                    <Separator opacity="0.5" />

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                        <Field label="Full Name" icon={User} defaultValue="Alex Johnson" />
                        <Field label="Email Address" icon={Mail} defaultValue="alex@example.com" />
                    </SimpleGrid>
                    
                    <Box>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb="2" ml="1">Bio / Description</Text>
                        <Input 
                            as="textarea" 
                            variant="subtle" 
                            placeholder="Tell us a bit about yourself..." 
                            rounded="2xl" 
                            p="4" 
                            h="32" 
                            bg="gray.50"
                        />
                    </Box>

                    <Button colorPalette="teal" rounded="xl" h="12" fontWeight="bold" w="fit-content" alignSelf="flex-end" px="10">
                        Save Changes
                    </Button>
                </Stack>
            </Box>

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

                <Stack gap="6" p="6" bg="white" rounded="3xl" border="1px solid" borderColor="gray.100">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                        <Field 
                            label="Current Password" 
                            type="password" 
                            icon={Lock} 
                            placeholder="••••••••" 
                        />
                        <Box display={{ base: "none", md: "block" }} />  
                        
                        <Field 
                            label="New Password" 
                            type="password" 
                            icon={Lock} 
                            placeholder="Min. 8 characters" 
                        />
                        <Field 
                            label="Confirm New Password" 
                            type="password" 
                            icon={ShieldCheck} 
                            placeholder="Confirm password" 
                        />
                    </SimpleGrid>

                    <Separator opacity="0.5" />

                    <Flex justify="space-between" align="center">
                        <Text fontSize="xs" color="gray.500" maxW="300px">
                            Make sure your new password is at least 8 characters long and includes numbers.
                        </Text>
                        <Button variant="outline" colorPalette="teal" rounded="xl" h="11" px="8" fontWeight="bold">
                            Update Password
                        </Button>
                    </Flex>
                </Stack>
            </Box>
        </Stack>
    )
}

// --- REUSABLE FIELD COMPONENT ---
function Field({ label, icon: LucideIcon, type = "text", placeholder, defaultValue }: any) {
    return (
        <Stack gap="1.5">
            <Text fontSize="xs" fontWeight="bold" color="gray.500" mb="0.5" ml="1">
                {label}
            </Text>
            <InputGroup w="full" startElement={<LucideIcon size={16} className="text-gray-400" />}>
                <Input 
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    variant="subtle"
                    bg="gray.50"
                    rounded="xl"
                    h="12"
                    _focus={{ bg: "white", borderColor: "teal.500", ring: "1px", ringColor: "teal.500" }}
                />
            </InputGroup>
        </Stack>
    )
}