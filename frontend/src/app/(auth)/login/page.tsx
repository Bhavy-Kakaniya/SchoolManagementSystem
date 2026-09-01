"use client"

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import InputFieldTag, { InputFieldTagProps } from "@/components/InputField";
import Link from "next/link";
import Lock from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import Email from '@mui/icons-material/Email';
import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { getMeService, loginService } from '@/services/auth.service';
import { getRoleRoute } from '@/lib/auth';
import { getErrorMessage } from '@/lib/error';

export default function LoginPage() {
    const class1 = "min-h-screen bg-blue-500 flex flex-col items-center justify-center"
    const class2 = "w-[90%] p-2"
    const class3 = "text-5xl text-center p-2 rounded-t-md bg-amber-400"
    const class4 = "bg-amber-100 p-4 rounded-b-md w-fit"
    const class5 = "text-right p-2 text-blue-800 underline"
    const class6 = "flex align-center justify-center"
    const class7 = "cursor-pointer text-white font-bold ease-in-out rounded-2xl bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:outline-none rounded-base text-sm px-20 py-2.5 text-center hover:px-17"

    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }
    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }
    const handleShowPassword = (): void => {
        setShowPassword(previous_state => !previous_state);
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return;
                const userData = await api("/auth/me");
                const role = userData?.rolesArray?.[0];

                const roleRoutes: Record<string, string> = {
                    SUPER_ADMIN: "/super-admin",
                    PRINCIPAL: "/principal",
                    TEACHER: "/teacher",
                    STUDENT: "/student",
                    PARENT: "/parent",
                };
                if (roleRoutes[role])
                    router.replace(roleRoutes[role]);

            } catch {
                localStorage.removeItem("accessToken");
            }
        };
        checkUser();
    }, [router]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await loginService({ email, password });
            localStorage.setItem("accessToken", result.accessToken);
            const userData = await getMeService();
            const role = userData.rolesArray?.[0];
            router.push(getRoleRoute(role));
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const formFields: InputFieldTagProps[] = [
        {
            type: "email",
            label: "Email Address",
            value: email,
            onChange: handleEmailInputChange,
            startIcon: <Email className="text-[#232323] m-1" />,
        },
        {
            type: showPassword ? "text" : "password",
            label: "Password",
            value: password,
            onChange: handlePasswordInputChange,
            startIcon: <Lock className="text-[#232323] m-1" />,
            endIcon: (
                <IconButton onClick={handleShowPassword}
                    edge="end" size="small" className="text-[#232323]" >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            )
        }
    ];

    return (
        <>
            {/* right */}
            <div className={class1}>
                <div className={class2}>
                    <div className={class3}>Login</div>
                    <div className={class4}>
                        <form onSubmit={handleLogin}>
                            <div className="m-2">
                                {formFields.map((field, index) => <InputFieldTag key={index} required={true} margin="dense" color="secondary" width="480px" {...field} />)}
                            </div>
                            <div className={class5}>
                                <Link href="/reset">Forgot Password?</Link>
                            </div>
                            <div>
                                <div className={class6}> <button type="submit" className={class7}>Login</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};