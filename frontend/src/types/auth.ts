import { RoleName } from "./roles";

export interface LoginValues {
    email: string;
    password: string;
};

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    schoolId: string | null;
};

export interface LoginResponse {
    message: string;
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export interface GetMeResponse {
    message: string;
    user: AuthUser;
    rolesArray: RoleName[];
};