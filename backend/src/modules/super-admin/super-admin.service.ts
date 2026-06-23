// Validate school exists -> Check email not already used in that school -> Find ADMIN role -> Generate temporary password↓
// Hash password -> Transaction -> Create User
//                              -> Assign ADMIN role -> Return temp password

import { RoleName } from '@prisma/client';
import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

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
}