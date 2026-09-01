"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation"

export default function SchoolAdminPage() {
    const router = useRouter();

    return (
        <>
            <Button onClick={() => router.push("/school-admin/students")}>Students page</Button>
        </>
    );
}