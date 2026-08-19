"use client"

import { Button } from "@mui/material"
import { useParams, useRouter } from "next/navigation"

export default function pag() {
const router = useRouter();
const { id } = useParams();
    return (
        <>
            <Button onClick={() => router.push(`/super-admin/schools/${id}/admin/create`)}>asbhkajs</Button> nothing
        </>
    )
}