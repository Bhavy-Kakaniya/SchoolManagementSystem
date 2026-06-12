"use client"

import { useAuth } from "@/hooks/useAuth";
import { RoleName } from "@/types/roles";

// FLOW of admin role check
/* 1. Call /auth/ me
 * 2. Get roles
 * 3. Check ADMIN role
 * 4. Redirect if not ADMIN
 */

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const { loading } = useAuth([RoleName.ADMIN]);
    if (loading)
        return <div>checking permission...</div>

    return children;
}