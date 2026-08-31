import { api } from "@/lib/api";
import { GetMeResponse, LoginResponse, LoginValues } from "@/types/auth";

export const loginService = async(data: LoginValues): Promise<LoginResponse> => {
    return await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const getMeService = async(): Promise<GetMeResponse> => {
    return await api("/auth/me");
};