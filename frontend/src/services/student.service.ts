import { api } from "@/lib/api";
import { CreateStudentValues } from "@/types/student";

export const getStudents = async (page: number = 1,limit: number = 10) => {
    return await api(`/students?page=${page}&limit=${limit}`);
};

export const getStudentById = async (studentId: string) => {
    return await api(`/students/${studentId}`);
};

export const createStudent = async (data: CreateStudentValues) => {
    return await api("/students", {
        method: "POST",
        body: JSON.stringify(data),
    });
};