
"use client"

import AdminHome from "@/components/dashboard/admin/home";
import HostHome from "@/components/dashboard/host/hostHome";
import UserHome from "@/components/dashboard/user/home";
import UnderConstruction from "@/components/undercons";
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
            {/* User */}
            {user?.role === "HOST" && <HostHome />}

        </Box>
    )
}