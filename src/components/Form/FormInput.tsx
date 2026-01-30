"use client";

import { Box, Input, Text, IconButton } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormInputProps {
    label?: string;
    name: string;
    value?: string;
    placeholder?: string;
    type?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
}

export function FormInput({
    label,
    name,
    value,
    isDisabled,
    placeholder,
    type = "text",
    error,
    onChange,
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <Box w="full">
            {label && (
                <Text fontSize="sm" fontWeight="medium" mb="1">
                    {label}
                </Text>
            )}

            <InputGroup
                w="full"
                endElement={
                    isPassword ? (
                        <IconButton
                            variant="ghost"
                            
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            color="gray.500"
                            _hover={{ bg: "transparent", color: "teal.500" }}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </IconButton>
                    ) : null
                }
            >
                <Input
                    name={name}
                    value={value}
                    type={inputType}
                    disabled={isDisabled}
                    placeholder={placeholder}
                    onChange={onChange}
                    bg="white"
                    borderColor={error ? "red.500" : "gray.300"}
                    _focus={{ borderColor: error ? "red.500" : "teal.500", boxShadow: "none" }}
                    pe={isPassword ? "10" : "4"}
                />
            </InputGroup>

            {error && (
                <Text fontSize="xs" color="red.500" mt="1">
                    {error}
                </Text>
            )}
        </Box>
    );
}