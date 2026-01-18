
"use client"

import AdminHome from "@/components/dashboard/admin/home";
import UserHome from "@/components/dashboard/user/home";
import { useAuth } from "@/hooks/useAuth"

export default function DashboardPage() {
    const { user } = useAuth();
    console.log("User data:", user);

    return (
        <div>
            {/* Admin */}
            {user?.role === "ADMIN" && <AdminHome />}

            {/* User */}
            {user?.role === "USER" && <UserHome />}

        </div>
    )
}