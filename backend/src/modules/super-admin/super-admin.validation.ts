import { uuid, z } from "zod";

export const createSchoolAdminSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email()
});

export const schoolIdParamsSchema = z.object({
    schoolId: z.uuid()
});