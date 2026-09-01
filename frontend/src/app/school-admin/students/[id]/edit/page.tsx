"use client";
// a828e343-090d-4953-93c6-61123f159f8d
import StudentForm from "@/components/student/StudentForm";
import { getErrorMessage } from "@/lib/error";
import { getStudentByIdService, updateStudentService } from "@/services/student.service";
import { Student, UpdateStudentValues } from "@/types/student";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudentPage() {
    const { id } = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);
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
        }
        fetchStudent();
    }, [id]);

    const handleSubmit = async (values: UpdateStudentValues) => {
        try {
            setError(null);
            if (!id) return;
            await updateStudentService(id.toString(), values);
            router.push(`/school-admin/students/${id}`);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };
    if (loading) {
        return <p>Loading Student...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!student) {
        return <p>Student not found</p>
    }

    const initialValues: UpdateStudentValues = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.user.email,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth.slice(0, 10),
        phone: student.phone ?? "",
        bloodGroup: student.bloodGroup ?? "",
        address: student.address ?? ""
    };
    return (
        <div className="p-6">
            <h1>Edit Student</h1>
            <StudentForm mode="edit" initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
}