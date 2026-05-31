"use client"

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import InputFieldTag from "@/components/InputField";
import Link from "next/link";
import Lock from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import Email from '@mui/icons-material/Email';
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
    const class1 = "min-h-screen bg-blue-500 flex flex-col items-center justify-center"
    const class2 = "w-[90%] p-2"
    const class3 = "text-5xl text-center p-2 rounded-t-md bg-amber-400"
    const class4 = "bg-amber-100 p-4 rounded-b-md w-fit"
    const class5 = "text-right p-2 text-blue-800 underline"
    const class6 = "flex align-center justify-center"
    const class7 = "cursor-pointer text-white font-bold ease-in-out rounded-2xl bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:outline-none rounded-base text-sm px-20 py-2.5 text-center hover:px-17"

    const router = useRouter();

    // manage password visibility state
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")

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

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem("token", data.accessToken);

        const roledata = await api('/auth/me', {
            method: 'GET',
        })

        const role = roledata.rolesArray[0];

        console.log("role", role)
        // router.push(`/${role.toLowerCase()}`)
        if (role === 'ADMIN') {
            router.push('/admin');
        }
        // console.log(data);
        // console.log(roledata);

    }

    return (
        <>
            {/* right */}
            <div className={class1}>
                <div className={class2}>
                    <div className={class3}>Login</div>
                    <div className={class4}>

                        <form onSubmit={handleLogin}>

                            <div className="m-2">

                                <InputFieldTag
                                    type="email"
                                    required={true}
                                    label="Email Address"
                                    margin="dense"
                                    color="secondary"
                                    width="480px"
                                    value={email}
                                    onChange={handleEmailInputChange}
                                    startIcon={<Email className="text-[#232323] m-1" />}
                                />

                                <InputFieldTag
                                    required={true}
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    width="480px"
                                    margin="dense"
                                    color="secondary"
                                    value={password}
                                    onChange={handlePasswordInputChange}
                                    startIcon={<Lock className="text-[#232323] m-1" />}
                                    endIcon={
                                        <IconButton
                                            onClick={handleShowPassword}
                                            edge="end"
                                            size="small"
                                            className="text-[#232323]"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>}
                                />

                            </div>

                            <div className={class5}>
                                <Link href="/reset">Forgot Password?</Link>
                            </div>

                            <div>
                                <div className={class6}>
                                    <button type="submit" className={class7}>Login</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}