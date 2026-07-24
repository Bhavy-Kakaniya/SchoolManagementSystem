import { z } from "zod";

export const uuidParamsSchema = z.object({
    id: z.uuid()
});

export const schoolIdParamsSchema = z.object({
    schoolId: z.uuid()
});

export const studentIdParamsSchema = z.object({
    studentId: z.uuid()
});