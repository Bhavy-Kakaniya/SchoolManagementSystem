import { Gender } from '@prisma/client';
import { z } from 'zod';

export const getStudentQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10)
});

export const createStudentSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    addmissionNo: z.string().min(1),
    gender: z.enum(Gender),
    dateOfBirth: z.coerce.date(),
    phone: z.string().optional(),
    bloodGroup: z.string().optional(),
    address: z.string().optional()
});

export const studentIdParamSchema = z.object({ id: z.uuid() });