"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation"

export default function SuperAdminPage() {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        router.replace("/login");
    }

    return (
        <>
            <div className="bg-red-400">
                super admin page
            </div>
            <Button className="bg-blue-900" onClick={()=> router.push("/super-admin/schools")}>View Schools</Button>
            <button onClick={handleLogout} className="m-3 bg-blue-400 rounded p-2 cursor-pointer">Logout</button>
        </>
    )
}