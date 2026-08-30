"use client"

import StudentTable from "@/components/student/StudentTable";
import { getErrorMessage } from "@/lib/error";
import { getStudentsService } from "@/services/student.service";
import { Student } from "@/types/student";
import { Button, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getStudentsService(page, limit);
                setStudents(result.students);
                setTotalPages(result.pagination.totalPages);
            } catch (err) {
                setError(getErrorMessage(err));
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
            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <StudentTable
                    students={students}
                    onView={(student) => router.push(`/school-admin/students/${student.id}`)}
                />
            )}
            {totalPages > 1 && (
                <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
            )}
        </div>
    )
}