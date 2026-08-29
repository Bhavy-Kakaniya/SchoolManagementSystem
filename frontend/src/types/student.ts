export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    admissionNo: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    dateOfBirth: string;
    phone?: string;
    bloodGroup?: string;
    address?: string;
    createdAt: Date;
    user: {
        id: string;
        email: string;
        name: string;
    }
};

export interface CreateStudentValues {
    firstName: string;
    lastName: string;
    email: string;
    admissionNo: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    dateOfBirth: string;
    phone?: string;
    bloodGroup?: string;
    address?: string;
};

export interface CreateStudentResponse {
    message: string;
    student: Student;
    temporaryPassword: string;
};

export interface CreatedStudent {
    student: Student;
    temporaryPassword: string
};