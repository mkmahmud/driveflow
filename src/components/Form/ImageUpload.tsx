"use client";

import {
  Avatar,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  value?: string;
  name?: string;
  onChange: (base64: string, file: File) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result, file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box position="relative" w="fit-content">
      <Avatar.Root size="xl">
        <Avatar.Image src={value || undefined} />
        <Avatar.Fallback name="User" />
      </Avatar.Root>

      <Button
        size="xs"
        rounded="full"
        position="absolute"
        bottom="0"
        right="0"
        colorPalette="teal"
        onClick={() => fileRef.current?.click()}
      >
        <Camera size={14} />
      </Button>

      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
    </Box>
  );
}
