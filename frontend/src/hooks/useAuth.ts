"use client"

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleName } from "@/types/roles";
import { getMeService } from "@/services/auth.service";

export const useAuth = (allowedRoles: RoleName[]) => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const userData = await getMeService();
                const userRoles = userData.rolesArray || [];
                const hasAccess = userRoles.some((role: RoleName) => allowedRoles.includes(role));

                if (!hasAccess) {
                    router.push('/unauthorized');
                    return;
                }
                setLoading(false);
            }
            catch {
                router.push('/login');
            }
        }
        checkAccess();
    }, [allowedRoles, router]);

    return { loading };
};