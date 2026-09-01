// /src/app/school-admin/students/create/page.tsx
"use client"

import StudentForm from "@/components/student/StudentForm";
import { Gender } from "@/types/student";
import { getErrorMessage } from "@/lib/error";
import { createStudentService } from "@/services/student.service";
import { CreatedStudent, CreateStudentValues } from "@/types/student";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateFormPage() {
    const [createdStudent, setCreatedStudent] = useState<CreatedStudent | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (values: CreateStudentValues) => {
        try {
            setError(null);
            const result = await createStudentService(values);
            setCreatedStudent({ student: result.student, temporaryPassword: result.temporaryPassword });
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <div className="p-6">
            {error && <p>{error}</p>}
            {!createdStudent && (
                <StudentForm
                    mode="create"
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        admissionNo: "",
                        gender: Gender.MALE,
                        dateOfBirth: "",
                        phone: "",
                        bloodGroup: "",
                        address: ""
                    }}
                    onSubmit={handleSubmit} />
            )}

            {createdStudent && (
                <div>
                    <h1>Student Created Successfully</h1>
                    <p>Name: {createdStudent.student.firstName}{" "}{createdStudent.student.lastName}</p>
                    <p>Admission No: {createdStudent.student.admissionNo}</p>
                    <p>Email: {createdStudent.student.user.email}</p>
                    <p>Temporary Password: {createdStudent.temporaryPassword}</p>
                    <Button variant="contained" onClick={() => router.push("/school-admin/students")}>Back to Students</Button>
                </div>
            )}
        </div>
    );
};