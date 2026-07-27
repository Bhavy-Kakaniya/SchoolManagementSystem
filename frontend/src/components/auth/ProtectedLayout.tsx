import { useAuth } from "@/hooks/useAuth";
import { RoleName } from "@/types/roles"

type Props = {
    allowedRoles: RoleName[],
    children: React.ReactNode
};

export default function ProtectedLayout({ allowedRoles, children }: Props) {
    const { loading } = useAuth(allowedRoles);
    if (loading)
        return <p>Loading...</p>
    return <>{children}</>
}