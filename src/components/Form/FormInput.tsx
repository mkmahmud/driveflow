"use client";

import { Box, Input, Text } from "@chakra-ui/react";

interface FormInputProps {
    label?: string;
    name: string;
    value?: string;
    placeholder?: string;
    type?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
    label,
    name,
    value,
    placeholder,
    type = "text",
    error,
    onChange,
}: FormInputProps) {
    return (
        <Box w="full">
            {label && (
                <Text fontSize="sm" fontWeight="medium" mb="1">
                    {label}
                </Text>
            )}

            <Input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                bg="white"
                borderColor="gray.300"
                _focus={{ borderColor: "teal.500" }}
            />

            {error && (
                <Text fontSize="xs" color="red.500" mt="1">
                    {error}
                </Text>
            )}
        </Box>
    );
}
