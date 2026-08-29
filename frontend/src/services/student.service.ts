import { api } from "@/lib/api";
import { CreateStudentResponse, CreateStudentValues } from "@/types/student";

export const getStudentsService = async (page: number = 1,limit: number = 10) => {
    return await api(`/students?page=${page}&limit=${limit}`);
};

export const getStudentByIdService = async (studentId: string) => {
    return await api(`/students/${studentId}`);
};

export const createStudentService = async (data: CreateStudentValues): Promise<CreateStudentResponse> => {
    return await api("/students", {
        method: "POST",
        body: JSON.stringify(data),
    });
};