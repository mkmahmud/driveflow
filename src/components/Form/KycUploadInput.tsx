"use client";

import {
    Box,
    Flex,
    Text,
    IconButton,
    Input,
} from "@chakra-ui/react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

interface Props {
    label: string;
    file: File | null;
    onChange: (file: File) => void;
}

export default function KycUploadInput({ label, file, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            onChange(selected);
        }
    };

    return (
        <Box
            onClick={() => inputRef.current?.click()}
            cursor="pointer"
            className={`rounded-xl px-4 py-4 transition ${file
                    ? "bg-emerald-700/40"
                    : "border-2 border-dashed border-emerald-300/60"
                }`}
                w="full"
        >
            <Flex align="center" justify="space-between">
                <Flex align="center" gap="3">
                    {file ? (
                        <CheckCircle2 size={18} className="text-emerald-300" />
                    ) : (
                        <UploadCloud size={18} className="text-emerald-300" />
                    )}

                    <Box>
                        <Text fontSize="sm" fontWeight="600" color="white">
                            {label}
                        </Text>
                        <Text fontSize="xs" color="emerald.200">
                            {file ? file.name : "Upload JPG or PNG"}
                        </Text>
                    </Box>
                </Flex>

                <IconButton
                    aria-label="upload"
                    // @ts-ignore
                    icon={<UploadCloud size={16} />}
                    size="sm"
                    variant="ghost"
                    color="white"
                />
            </Flex>

            {/* REAL input */}
            <Input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={handleFileChange}
            />
        </Box>
    );
}
