"use client"

import SchoolForm from "@/components/school/SchoolForm";
import { getSchoolById, updateSchool } from "@/services/school.service";
import { School, SchoolFormValues } from "@/types/school";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditSchoolPage() {
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();
    useEffect(() => {
        const fetchSchool = async () => {
            try {
                if (!id) { return }
                const school = await getSchoolById(id.toString());
                setSchool(school)
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong");
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchSchool();
    }, [id]);

    if (loading) return <p>Loadin school</p>
    if (error) return <p>{error}</p>
    if (!school) return <p>School not found</p>
    if (!school.logo) return <p>No logo</p>

    const handleSubmit = async(values: SchoolFormValues) => {
        try{
            await updateSchool(id!.toString(), values);
        } catch (error){
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
    };
    return (
        <SchoolForm
            initialValues={{
                name: school.name,
                slug: school.name,
                logo: school.logo
            }}
            onSubmit={handleSubmit}
        />
    )
}