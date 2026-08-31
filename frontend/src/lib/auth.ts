import { RoleName } from "@/types/roles";

export const roleRoutes: Record<RoleName, string> = {
    [RoleName.SUPER_ADMIN]: "/super-admin",
    [RoleName.SCHOOL_ADMIN]: "/school-admin",
    [RoleName.PRINCIPAL]: "/principal",
    [RoleName.TEACHER]: "/teacher",
    [RoleName.STUDENT]: "/student",
    [RoleName.PARENT]: "/parent",
};

export const getRoleRoute = (role: RoleName): string => {
    return roleRoutes[role] || "/unauthorized";
};