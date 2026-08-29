"use client"

import { deleteSchoolService, getSchoolsService } from "@/services/school.service";
import { School } from "@/types/school";
import { useEffect, useState } from "react";
import SchoolTable from "@/components/school/SchoolTable";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

// 1. call getSchoolsService
// 2. store schools in states
// 3. loading or error state
// 4. pass data to school table
// SchoolTable.tsx will display schools, render columns render action buttons

export default function SchoolPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchSchools = async () => {
        try {
            const schools = await getSchoolsService();
            setSchools(schools);
        } catch (err) {
            console.error(err);
            if (err instanceof Error)
                setError(err.message);
            else
                setError("Something went wrong.")
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (school: School) => {
        router.push(`/super-admin/schools/${school.id}/edit`)
    }

    const handleDelete = async (school: School) => {
        try {
            await deleteSchoolService(school.id.toString());
            setSchools((previousSchools) =>
                previousSchools.filter(
                    (currentSchool) => currentSchool.id !== school.id
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    if (loading) return <p>Loading schools ...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div>
                <h1>Schools</h1>
                <Button color="primary" onClick={() => router.push("/super-admin/schools/create")}>Create</Button>
                {schools.length === 0 ?
                    (<p>No schools found.</p>)
                    : (
                        <SchoolTable
                            schools={schools} onEdit={(school) => { handleEdit(school) }} onDelete={handleDelete}
                        />
                    )}
            </div>
        </>
    );
}