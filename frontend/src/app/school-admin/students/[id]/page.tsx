"use client";

import { getErrorMessage } from "@/lib/error";
import { deactivateStudentService, getStudentByIdService } from "@/services/student.service";
import { Student } from "@/types/student";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentById() {
    const { id } = useParams();
    const router = useRouter();

    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                if (!id) return;
                const result = await getStudentByIdService(id.toString());
                setStudent(result);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleDeactivate = async () => {
        try {
            if (!id) return;

            const confirmed = window.confirm("Are you sure you want to deactivate this student");
            if (!confirmed) return;

            await deactivateStudentService(id.toString());
            router.push("/school-admin/students");
        } catch (err) {
            setError(getErrorMessage(err));
        }
    }

    if (loading) return <p>Loading Student...</p>
    if (error) return <p>{error}</p>
    if (!student) return <p>Student not found</p>

    return (
        <div>
            <h1>Student Details</h1>
            <p>Name: {student.firstName} {student.lastName}</p>
            <p>Admission No: {student.admissionNo}</p>
            <p>Email: {student.user.email}</p>
            <p>Gender: {student.gender}</p>
            <p>Date of Birth: {student.dateOfBirth}</p>
            <p>Phone: {student.phone || "Not provided"}</p>
            <p>Blood Group: {student.bloodGroup || "Not provided"}</p>
            <p>Address: {student.address || "Not provided"}</p>
            <Button variant="contained" onClick={() => router.push(`/school-admin/students/${id}/edit`)}>Edit Student</Button>
            <Button variant="contained" onClick={handleDeactivate}>Deactivate Student</Button>
        </div>
    );
}