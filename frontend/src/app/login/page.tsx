"use client"

import InputFieldTag from "@/components/InputField";
import Link from "next/link";
import Lock from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import Email from '@mui/icons-material/Email';
import { useState } from "react";
import { IconButton } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";

const loginButtonClass = "cursor-pointer text-white font-bold ease-in-out rounded-2xl bg-linear-to-br from-green-400 to-blue-600 hover:bg-linear-to-bl focus:outline-none rounded-base text-sm px-20 py-2.5 text-center";

export default function LoginPage() {
    // manage password visibility state
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const handleShowPassword = (): void => {
        setShowPassword((previous_state) => !previous_state);
    }

    return (
        <>
            <div className="flex min-h-screen bg-[#f2f5ff] ">

                {/* left */}
                <div className="w-[60%] bg-blue-600">
                    {/* image */}
                </div>

                {/* right */}
                <div className="w-[40%] bg-blue-500 flex flex-col items-center justify-center">
                    <div className="w-[90%] p-2">
                        <div className="text-5xl text-center p-2 rounded-t-md bg-amber-400">Login</div>
                        <div className="bg-amber-100 p-4 rounded-b-md w-fit">

                            <form>

                                <div className="m-2">
                                    <InputFieldTag
                                        type="email"
                                        required={true}
                                        label="Email Address"
                                        margin="dense"
                                        color="secondary"
                                        width="480px"
                                        startIcon={<Email className="text-[#232323] m-1" />}
                                    />
                                    <InputFieldTag
                                        required={true}
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        width="480px"
                                        margin="dense"
                                        color="secondary"
                                        value={inputValue}
                                        onChange={handleInputChange}
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
                                <div className="text-right p-2 text-blue-800 underline">
                                    <Link href="/reset">Forgot Password?</Link>
                                </div>
                                <div>
                                    <div className="flex align-center justify-center">
                                        <button type="button" className={loginButtonClass}>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

// https://www.google.com/search?newwindow=1&sca_esv=78ed2d1ec9f8904c&rlz=1C1CHBF_enIN1113IN1113&udm=2&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3sbM0Xv-BZKE_VrZb6-djVgPsTSy5UjazDfPq8BLa8BriI08eYAyMPM-9LNl6snbW_yG33vd5kd7YGQszX_cbkaDseZZZQ4GJmswgKnVwR-BbFIQ4ksHjYk73mHmEeQacRsvQm4-5-e26BJ6LRr1xFgGV_ekSmQjvkNKKw4olJHuHx0Lcw&q=login+page+school+erp&sa=X&ved=2ahUKEwjTxL_Vuq6UAxU5kVYBHQxPEPoQtKgLegQIFBAB&biw=1536&bih=730&dpr=1.25#sv=CAMSVhoyKhBlLXNQVlVQRDJNNVkwOXlNMg5zUFZVUEQyTTVZMDl5TToOd3dKMWpaTjNnU2VsM00gBCocCgZtb3NhaWMSEGUtc1BWVVBEMk01WTA5eU0YADABGAcgr635qw1KCBABGAEgASgB