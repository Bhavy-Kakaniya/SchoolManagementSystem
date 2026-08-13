"use client"

import { getSchoolById } from "@/services/school.service";
import { School } from "@/types/school";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SchoolInfoPage() {
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();
    useEffect(() => {
        const fetchSchool = async () => {
            try {
                if (!id) return;
                const school = await getSchoolById(id.toString());
                setSchool(school);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchSchool();
    }, [id]);
    if (loading) return <p>Loading school...</p>
    if (error) return <p>{error}</p>
    if (!school) return <p>School not found</p>

    return (
        <div>
            <p>School ID: {school.id}</p>
            <p>Name: {school.name}</p>
            <p>Slug: {school.slug}</p>
            <p>Logo: {school.logo ? school.logo : "No logo"}</p>
        </div>
    );
}