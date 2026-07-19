import { Request, Response } from 'express';
import { createSchoolAdminSchema, schoolIdParamsSchema } from './super-admin.validation';
import { createSchoolAdminService } from './super-admin.service';

export const createSchoolAdminController = async (req: Request, res: Response) => {
    const validateData = createSchoolAdminSchema.parse(req.body);
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await createSchoolAdminService(schoolId, validateData);
    res.status(201).json(result);
}