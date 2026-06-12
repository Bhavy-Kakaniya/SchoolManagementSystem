"use client"

import { useRouter } from "next/navigation"

export default function adminPage() {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        router.replace("/login");
    }

    return (
        <>
            <div className="bg-red-400">
                admin page
            </div>

            <button onClick={handleLogout} className="m-3 bg-blue-400 rounded p-2 cursor-pointer">Logout</button>
        </>
    )
}