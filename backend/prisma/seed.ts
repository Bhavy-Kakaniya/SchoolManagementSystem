// this file is for seeding all the data when there is nothing in database or in case of reset, to avoid inserting data manually

import { PrismaClient } from '@prisma/client';
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

    const school = await prisma.school.create({
        data: {
            name: "Darshan School",
            slug: "darshan"
        }
    })

    const super_admin_role = await prisma.role.upsert({ // upsert to prevent duplication error
        where: {
            name: "SUPER_ADMIN"
        },
        update: {},
        create: {
            name: "SUPER_ADMIN"
        }
    })

    const school_admin_role = await prisma.role.create({
        data: {
            name: "SCHOOL_ADMIN"
        }
    })

    const hashed_password = await bcrypt.hash("admin123", 10);

    const admin_user = await prisma.user.create({
        data: {
            schoolId: school.id,
            name: "Main Admin",
            email: "admin@darshan.com",
            password: hashed_password
        }
    })

    await prisma.userRole.create({
        data: {
            userId: admin_user.id,
            roleId: school_admin_role.id
        }
    })

    console.log("data seed completed");
}

main()
    .catch((e) => console.error("seed error: ", e, "\nerror message", e.message))
    .finally(async () => await prisma.$disconnect())