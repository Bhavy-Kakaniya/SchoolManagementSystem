"use client"

import ProtectedLayout from "@/components/auth/ProtectedLayout";
import { RoleName } from "@/types/roles";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    <ProtectedLayout allowedRoles={[RoleName.STUDENT]}>
        {children}
    </ProtectedLayout>
};