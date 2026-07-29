// Validate school exists -> Check email not already used in that school -> Find ADMIN role -> Generate temporary password ->
// Hash password -> Transaction -> Create User
//                              -> Assign ADMIN role -> Return temp password

import { Prisma, RoleName } from '@prisma/client';
import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { getSchoolsQuery, updateSchoolBody } from './super-admin.validation';

export const createSchoolAdminService = async (schoolId: string, data: { name: string, email: string }) => {
    const [school, adminRole, existingUser] = await Promise.all([
        prisma.school.findUnique({ where: { id: schoolId } }),
        prisma.role.findUnique({ where: { name: RoleName.ADMIN } }),
        prisma.user.findFirst({ where: { schoolId, email: data.email } })
    ]);

    if (!school) throw new AppError(404, "School not found");
    if (!adminRole) throw new AppError(500, "Admin role not found");
    if (existingUser) throw new AppError(409, "User already exists");

    const temporaryPassword = crypto.randomBytes(6).toString("base64").replace(/[+/=]/g, "").slice(0, 8);
    const hashedPassowrd = await bcrypt.hash(temporaryPassword, 10);

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                schoolId,
                name: data.name,
                email: data.email,
                password: hashedPassowrd
            }
        });

        await tx.userRole.create({
            data: {
                userId: user.id,
                roleId: adminRole.id
            }
        });
        // this can be optimised by writing userRole in user query after we get id

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

    return {
        message: "School admin created successfully",
        admin: result,
        temporaryPassword
    }
};

export const getAllSchoolsService = async (query: getSchoolsQuery) => {
    const skip = (query.page - 1) * query.limit;

    const where: Prisma.SchoolWhereInput = { // to avoid where error due to type script
        deletedAt: null,
        OR: [
            { name: { contains: query.search, mode: "insensitive" } },
            { slug: { contains: query.search, mode: "insensitive" } }
        ]
    };

    const [total, schools] = await Promise.all([
        prisma.school.count({ where }),
        prisma.school.findMany({
            where, // this will return what is searched not its slug
            skip,
            take: query.limit
        })
    ]);

    return {
        success: true,
        message: "Schools fetched successfully",
        data: schools,
        pagination: {
            page: query.page,
            limit: query.limit,
            total,
            totalPages: Math.ceil(total / query.limit)
        }
    };
}

export const getSchoolByIdService = async (schoolId: string) => {
    const school = await prisma.school.findUnique({ where: { id: schoolId, deletedAt: null } });
    if (!school) {
        throw new AppError(404, "School not found")
    }
    return {
        success: true,
        message: "School fetched successfully",
        data: {
            id: school.id,
            name: school.name,
            slug: school.slug,
            logo: school.logo,
            createdAt: school.createdAt
        }
    };
};

export const updateSchoolService = async (schoolId: string, data: updateSchoolBody) => {
    const school = await prisma.school.findFirst({ where: { id: schoolId, deletedAt: null } });

    if (!school) {
        throw new AppError(404, "School not found");
    }
    const exisitingSchool = await prisma.school.findFirst({ where: { slug: data.slug, deletedAt: null, NOT: { id: schoolId } } });

    if (exisitingSchool) {
        throw new AppError(409, "Slug already exists");
    }
    const updatedSchool = await prisma.school.update({ where: { id: schoolId }, data });

    return {
        success: true,
        message: "School updated successfully",
        data: {
            id: updatedSchool.id,
            name: updatedSchool.name,
            slug: updatedSchool.slug,
            logo: updatedSchool.logo,
            createdAt: updatedSchool.createdAt
        }
    };
};

export const softDeleteSchoolService = async (schoolId: string) => {
    try { // try catch will send proper message to frontend not prisma error if a wrong id is entered
        await prisma.school.update({
            where: { id: schoolId, deletedAt: null }, data: { deletedAt: new Date() }
        });

        return {
            success: true,
            message: "School deleted successfully"
        };
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            throw new AppError(404, "School not found");
        }
        throw err;
    }
};

export const restoreSchoolService = async (schoolId: string) => {
    try {
        await prisma.school.update({
            where: { id: schoolId, NOT: { deletedAt: null } }, data: { deletedAt: null }
        });
        return {
            success: true,
            message: "School restored successfully"
        };
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            throw new AppError(404, "School not found");
        }
        throw err;
    }
};


{ { { { { { { { { { { { { { { } } } } } } } } } } } } } } }