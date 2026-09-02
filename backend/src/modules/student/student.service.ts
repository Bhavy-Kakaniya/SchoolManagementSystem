import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import { Gender, RoleName, StudentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

type CreateStudentInput = {
    firstName: string,
    lastName: string,
    email: string,
    admissionNo: string,
    gender: Gender,
    dateOfBirth: Date,
    phone?: string,
    bloodGroup?: string,
    address?: string
};

type UpdateStudentInput = {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    dateOfBirth: Date;
    phone?: string;
    bloodGroup?: string;
    address?: string;
};

export const createStudentService = async (schoolId: string, data: CreateStudentInput) => {
    const [existingUser, existingStudent, studentRole] = await Promise.all([
        prisma.user.findFirst({ where: { schoolId, email: data.email } }),
        prisma.student.findFirst({ where: { schoolId, admissionNo: data.admissionNo } }),
        prisma.role.findUnique({ where: { name: RoleName.STUDENT } })
    ]);

    if (existingUser) throw new AppError(409, "Email already exists");
    if (existingStudent) throw new AppError(409, "Admission Number already exists");
    if (!studentRole) throw new AppError(500, "Student role not found");

    const temporaryPassword = crypto.randomBytes(6).toString("base64").replace(/[+/=]/g, "").slice(0, 8);
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    const result = await prisma.$transaction(
        async (tx) => {
            const user = await tx.user.create({
                data: {
                    schoolId,
                    email: data.email,
                    password: hashedPassword,
                    name: `${data.firstName} ${data.lastName}`
                }
            });
            await tx.userRole.create({
                data: {
                    userId: user.id,
                    roleId: studentRole.id
                }
            });
            const student = await tx.student.create({
                data: {
                    userId: user.id,
                    schoolId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    admissionNo: data.admissionNo,
                    gender: data.gender,
                    dateOfBirth: new Date(data.dateOfBirth),
                    phone: data.phone,
                    bloodGroup: data.bloodGroup,
                    address: data.address
                },
                include: { user: { select: { id: true, email: true, name: true } } }
            });
            return student;
        }
    );

    return {
        message: "Student created successfully",
        student: result,
        temporaryPassword
    }
}

export const getStudentsService = async (schoolId: string, page: number, limit: number) => {
    /* ----- flow -----
     * getStudents()
     * count()
     * return student and pagination
     */

    const skip = (page - 1) * limit;

    const where = {
        schoolId,
        status: StudentStatus.ACTIVE
    };

    const [total, students] = await Promise.all([
        prisma.student.count({ where }),
        prisma.student.findMany({
            where,
            include: { user: { select: { id: true, email: true, name: true } } },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" } // newest student appears first
        })
    ]);

    return {
        students,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    }
}

export const getStudentByIdService = async (schoolId: string, studentId: string) => {
    // find unique will require to check if student's school id is same as original school id
    // so that no admin of school can view student of other school
    const student = await prisma.student.findFirst({
        where: { id: studentId, schoolId },
        include: { user: { select: { id: true, email: true, name: true } } }
    });
    if (!student) throw new AppError(404, "Student not found");
    return student;
}

export const updateStudentService = async (schoolId: string, studentId: string, data: UpdateStudentInput) => {

    // chech if student exist, use schoolId so that admin of a school cannot modify another school
    const student = await prisma.student.findFirst({
        where: { id: studentId, schoolId },
        include: { user: true },
    });
    if (!student) throw new AppError(404, "Student not found");

    // check if the new email already exists ?
    if (data.email !== student.user.email) {
        const existingUser = await prisma.user.findFirst({
            where: { schoolId, email: data.email, id: { not: student.userId } }
        });
        if (existingUser) throw new AppError(409, "Email already exists");
    }

    // finally update the student information
    const result = await prisma.$transaction(async (tx) => {

        // update user table
        const user = await tx.user.update({
            where: { id: student.userId },
            data: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email
            }
        });

        // update student table
        const updatedStudent = await tx.student.update({
            where: { id: studentId },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                phone: data.phone,
                bloodGroup: data.bloodGroup,
                address: data.address
            },
            // include will fetch the related user record linked to the updated student
            include: { user: { select: { id: true, name: true, email: true } } }
        });
        return updatedStudent;
    });
    return {
        message: "Student updated successfully",
        student: result
    };
};

export const deactivateStudentService = async (schoolId: string, studentId: string) => {

    // get student and check if student exists
    const student = await prisma.student.findFirst({
        where: { id: studentId, schoolId }
    });
    if (!student) throw new AppError(404, "Student not found");

    // check whether student already inactive
    if (student.status === StudentStatus.INACTIVE) throw new AppError(400, "Student is already inactive");

    // update status
    const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: { status: StudentStatus.INACTIVE }
    });

    return {
        message: "Student deactivated successfully",
        student: updatedStudent
    };
};