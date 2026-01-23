"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormProps {
    children: ReactNode;
    onSubmit: () => void;
}

export function Form({ children, onSubmit }: FormProps) {
    return (
        <Box
            as="form"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="space-y-4"
        >
            {children}
        </Box>
    );
}
