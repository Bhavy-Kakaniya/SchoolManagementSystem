import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import { Gender, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/*
 * check whether email already exists or not.
 * check admission number.
 * check student role exists.
 * password generation.
 * transaction : create user -> assign student role -> create student
 * return data
 */

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
}

export const createStudentService = async (schoolId: string, data: CreateStudentInput) => {
    // const existingUser = await prisma.user.findFirst({
    //     where: { schoolId, email: data.email }
    // });
    // if (existingUser) throw new AppError(409, "Email already exists");
    // const existingStudent = await prisma.student.findFirst({
    //     where: { schoolId, admissionNo: data.admissionNo }
    // });
    // if(existingStudent) throw new AppError(409, "Admission number already exisits");

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
                    dateOfBirth: data.dateOfBirth,
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

    const [total, students] = await Promise.all([
        prisma.student.count({ where: { schoolId } }),
        prisma.student.findMany({
            where: { schoolId },
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

    if(!student) throw new AppError(404, "Student not found");

    return student;
}