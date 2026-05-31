"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/lib/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    /* 1. Call /auth/ me
     * 2. Get roles
     * 3. Check ADMIN role
     * 4. Redirect if not ADMIN
     */

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const userData = await api('/auth/me');
                console.log(userData);

                const roles = userData.rolesArray;

                if (!roles.includes('ADMIN')) {
                    router.push('/unauthorized');
                }

                setLoading(false);
            } catch {
                router.push('/login')
            }
        }
        checkAccess()
    }, [])

    if (loading) {
        return <div className="text-blue-600 text-4xl text-center">Checking permissions ...</div>
    }

    return children;
}