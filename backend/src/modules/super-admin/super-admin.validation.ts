import { uuid, z } from "zod";

export const createSchoolAdminSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email()
});

export const schoolIdParamsSchema = z.object({
    schoolId: z.uuid()
});

export const getSchoolsSchema = z.object({
    // coerce will convert string to number because the query parameter will be needed to changed integer
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().default("")
});

export type GetSchoolsQuery = z.infer<typeof getSchoolsSchema>; // this can be used in service for parameters