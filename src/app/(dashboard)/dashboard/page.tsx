
"use client"

import AdminHome from "@/components/dashboard/admin/home";
import UserHome from "@/components/dashboard/user/home";
import { useAuth } from "@/hooks/useAuth" 
import { Box } from "@chakra-ui/react";

export default function DashboardPage() {
    const { user } = useAuth();

    // All Users 
  

    return (
        <Box>
            {/* Admin */}
            {user?.role === "ADMIN" && <AdminHome />}

            {/* User */}
            {user?.role === "USER" && <UserHome />}

        </Box>
    )
}