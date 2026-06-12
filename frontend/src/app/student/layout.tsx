"use client"

import { useAuth } from "@/hooks/useAuth";
import { RoleName } from "@/types/roles";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    /* 1. Call /auth/ me
     * 2. Get roles
     * 3. Check STUDENT role
     * 4. Redirect if not ADMIN
     */

    const { loading } = useAuth([RoleName.STUDENT]);
    if (loading)
        return <div>checking permission...</div>

    return children;
}