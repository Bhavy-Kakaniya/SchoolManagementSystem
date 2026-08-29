"use client"

import { getStudentsService } from "@/services/student.service";
import { Student } from "@/types/student";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const result = await getStudentsService(page, limit);
                setStudents(result.students);
                setTotalPages(result.pagination.totalPages);
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
        fetchStudents();
    }, [page, limit]);

    if (loading) return <p>Loading students...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Students</h1>
            <p>Total pages : {totalPages}</p>
            <p>Student loaded: {students.length}</p>
            <Button onClick={() => router.push("/school-admin/students/create")}>Create Student</Button>
        </div>
    )
}