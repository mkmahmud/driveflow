"use client"

import { trpc } from '@/trpc/client'
import { useState, useEffect, createContext, useContext } from 'react'

interface User {
    id: string
    email: string
    name: string | null
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    logout: () => void
    refreshUser: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // 1. Let tRPC manage the data fetching
    const { data: user, isLoading, refetch } = trpc.auth.me.useQuery(undefined, {
        retry: false,
        staleTime: Infinity, // Keeps the user data "fresh" so it doesn't refetch constantly
    })

    // 2. Use a mutation for logout to clear the server-side cookie
    const utils = trpc.useUtils()
    const logoutMutation = trpc.auth.logout.useMutation({
        onSuccess: () => {
            utils.auth.me.setData(undefined, null) // Clear cache
            window.location.href = '/'
        }
    })

    const logout = () => {
        logoutMutation.mutate()
    }

    return (
        <AuthContext.Provider value={{
            // @ts-ignore
            user: user ?? null, // Fallback to null if undefined
            isLoading,
            logout,
            refreshUser: refetch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}