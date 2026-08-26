"use client"

import { getStudents } from "@/services/student.service";
import { Student } from "@/types/student";
import { useEffect, useState } from "react";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const result = await getStudents(page, limit);
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
        </div>
    )
}