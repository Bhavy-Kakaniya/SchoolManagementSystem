export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    admissionNo: string;
    gender: Gender;
    dateOfBirth: string;
    phone?: string;
    bloodGroup?: string;
    address?: string;
    createdAt: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export interface CreateStudentResponse {
    message: string;
    student: Student;
    temporaryPassword: string;
}

export interface CreatedStudent {
    student: Student;
    temporaryPassword: string;
}

export interface StudentFormValues {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    dateOfBirth: string;
    phone: string;
    bloodGroup: string;
    address: string;
}

export interface CreateStudentValues extends StudentFormValues {
    admissionNo: string;
}

export type UpdateStudentValues = StudentFormValues;
export type UpdateStudentInput = StudentFormValues;