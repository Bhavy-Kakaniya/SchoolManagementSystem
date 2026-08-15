"use client"
import SchoolForm from "@/components/school/SchoolForm";
import { createSchool } from "@/services/school.service";
import { SchoolFormValues } from "@/types/school";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateSchoolPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: SchoolFormValues) => {
        try {
            await createSchool(values);
            router.push("/super-admin/schools");
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
            <h1>Create School</h1>
            {error && <p>{error}</p>}
            <SchoolForm initialValues={{ name: "", slug: "", logo: "" }} onSubmit={handleSubmit} />
        </div>
    );
}