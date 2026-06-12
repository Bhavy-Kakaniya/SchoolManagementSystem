"use client"

import { useAuth } from "@/hooks/useAuth";
import { RoleName } from "@/types/roles";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    /* 1. Call /auth/ me
     * 2. Get roles
     * 3. Check TEACHER role
     * 4. Redirect if not ADMIN
     */

    const { loading } = useAuth([RoleName.TEACHER]);
    if (loading)
        return <div>checking permission...</div>

    return children;
}