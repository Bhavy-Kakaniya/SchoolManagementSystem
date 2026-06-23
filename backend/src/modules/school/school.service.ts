// createSchool() -> Check slug already exists -> school -> Return school

import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';

export const createSchoolService = async (data: { name: string, slug: string }) => {
    const existingSchool = await prisma.school.findUnique({ where: { slug: data.slug } });

    if (existingSchool) throw new AppError(409, "School already exists");

    const school = await prisma.school.create({
        data: { name: data.name, slug: data.slug }
    });

    return {
        message: "School created successfully",
        school
    };
}