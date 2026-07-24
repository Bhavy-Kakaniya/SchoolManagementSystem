import { Request, Response } from 'express';
import { createSchoolAdminSchema, getSchoolsSchema, schoolIdParamsSchema } from './super-admin.validation';
import { createSchoolAdminService, getSchoolsService } from './super-admin.service';

export const createSchoolAdminController = async (req: Request, res: Response) => {
    const validateData = createSchoolAdminSchema.parse(req.body);
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await createSchoolAdminService(schoolId, validateData);
    res.status(201).json(result);
};

export const getSchoolsController = async (req: Request, res: Response) => {
    // GET /super-admin/schools
    // GET /super-admin/schools?page=1&limit=2
    // GET /super-admin/schools?search=modi
    // GET /super-admin/schools?search=MODI
    const query = getSchoolsSchema.parse(req.query);
    const result = await getSchoolsService(query);
    res.status(200).json(result);
};