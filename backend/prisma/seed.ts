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
            name: "Darshan School",
            slug: "darshan"
        },
        update: {},
        create: {
            name: "Darshan School",
            slug: "darshan"
        }
    })

    const roles = [
        RoleName.ADMIN,
        RoleName.PARENT,
        RoleName.PRINCIPAL,
        RoleName.STUDENT,
        RoleName.TEACHER
    ]

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
                email: "admin@darshan.com",
            }
        },
        update: {},
        create: {
            schoolId: school.id,
            name: "Main Admin",
            email: "admin@darshan.com",
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

    console.log("data seed completed");
}

main()
    .catch((e) => console.error("seed error: ", e, "\nerror message", e.message))
    .finally(async () => await prisma.$disconnect())