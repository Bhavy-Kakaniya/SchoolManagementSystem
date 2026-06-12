"use client"

// 1. loading state
// 2. /auth/me call
// 3. role validation
// 4. login redirect
// 5. unauthorized redirect

/*
    /auth/me -> extract roles -> hasAccess? -> yes → setLoading(false) 
                                               no  → /unauthorized
                                               error → /login
*/

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleName } from "@/types/roles";

export const useAuth = (allowedRoles: RoleName[]) => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const userData = await api('/auth/me');

                const userRoles = userData.rolesArray || [];

                const hasAccess = userRoles.some((role: RoleName) =>
                    allowedRoles.includes(role)
                )

                if (!hasAccess) {
                    router.push('/unauthorized');
                    return;
                }

                setLoading(false);
            }
            catch (e) {
                router.push('/login');
                return;
            }
        }
        checkAccess()
    }, [])
    return { loading }
}