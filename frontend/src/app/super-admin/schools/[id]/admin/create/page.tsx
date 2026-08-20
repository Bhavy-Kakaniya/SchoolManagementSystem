"use client"

import SchoolAdminForm from "@/components/school-admin/SchoolAdminForm";
import { createSchoolAdmin } from "@/services/school.service";
import { CreateSchoolAdminValues } from "@/types/school";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation"
import { useState } from "react";

export default function CreateSchoolAdminPage() {
    const { id } = useParams();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [createAdmin, setCreateAdmin] = useState<{ name: string, email: string, temporaryPassword: string } | null>(null);
    const handleSubmit = async (values: CreateSchoolAdminValues) => {

        try {
            if (!id) return;
            const result = await createSchoolAdmin(id.toString(), values);
            setCreateAdmin({
                name: result.admin.name,
                email: result.admin.email,
                temporaryPassword: result.temporaryPassword
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <div>
            <h1>Create School Admin</h1>
            {error && <p>{error}</p>}
            {createAdmin && (
                <div>
                    <h2>School Admin Created Successfully</h2>
                    <p>Name: {createAdmin.name}</p>
                    <p>Email: {createAdmin.email}</p>
                    <p>Temporary Password: {createAdmin.temporaryPassword}</p>
                    <Button variant="outlined" onClick={() => router.push(`/super-admin/schools/${id}`)}>Back to School</Button>
                </div>
            )}
            {!createAdmin && (
                <SchoolAdminForm
                    initialValues={{ name: "", email: "" }}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}