"use client"

import ProtectedLayout from "@/components/auth/ProtectedLayout";
import { RoleName } from "@/types/roles";

// FLOW of admin role check
/* 1. Call /auth/ me
 * 2. Get roles
 * 3. Check ADMIN role
 * 4. Redirect if not ADMIN
 */

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    <ProtectedLayout allowedRoles={[RoleName.SUPER_ADMIN]}>{children}</ProtectedLayout>
};