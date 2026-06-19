// this file is for seeding all the data when there is nothing in database or in case of reset, to avoid inserting data manually

import { PrismaClient, RoleName } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from 'bcryptjs';

const { Pool } = pg

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
    connectionString,
})

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {

    const school = await prisma.school.upsert({
        where: {
            name: "Modi School",
            slug: "modi"
        },
        update: {},
        create: {
            name: "Modi School",
            slug: "modi"
        }
    })

    const roles = Object.values(RoleName);

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role },
            update: {},
            create: { name: role }
        });
    }

    const admin_role = await prisma.role.findUnique({
        where: { name: RoleName.ADMIN }
    })

    if (!admin_role) {
        throw new Error("ADMIN role not found");
    }

    const hashed_password = await bcrypt.hash("admin123", 10);

    const admin_user = await prisma.user.upsert({
        where: {
            schoolId_email: {
                schoolId: school.id,
                email: "admin@modi.com",
            }
        },
        update: {},
        create: {
            schoolId: school.id,
            name: "Main Admin",
            email: "admin@modi.com",
            password: hashed_password
        }
    })

    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: admin_user.id,
                roleId: admin_role.id
            }
        },
        update: {},
        create: { userId: admin_user.id, roleId: admin_role.id }
    })

    const platformSchool = await prisma.school.upsert({
        where: { slug: "platform" },
        update: {},
        create: { name: "Platform", slug: "platform" }
    });

    const superAdminRole = await prisma.role.findUnique({
        where: { name: RoleName.SUPER_ADMIN }
    })

    if (!superAdminRole) throw new Error("super admin role not found");

    const superAdminHashedPassword = await bcrypt.hash("superadmin123", 10);

    const superAdminUser = await prisma.user.upsert({
        where: {
            schoolId_email: { schoolId: platformSchool.id, email: "superadmin@sms.com" }
        },
        update: {},
        create: {
            schoolId: platformSchool.id,
            name: "Super Admin",
            email: "superadmin@sms.com",
            password: superAdminHashedPassword
        }
    });

    await prisma.userRole.upsert({
        where: { userId_roleId: { userId: superAdminUser.id, roleId: superAdminRole.id } },
        update: {},
        create: {userId: superAdminUser.id, roleId: superAdminRole.id}
    })
}

main()
    .catch((e) => console.error("seed error: ", e, "\nerror message", e.message))
    .finally(async () => await prisma.$disconnect())