import { Request, Response } from 'express';
import { createSchoolAdminSchema, getAllSchoolsSchema, updateSchoolSchema } from './super-admin.validation';
import { createSchoolAdminService, getSchoolAdminsService, getAllSchoolsService, getSchoolByIdService, restoreSchoolService, softDeleteSchoolService, updateSchoolService } from './super-admin.service';
import { schoolIdParamsSchema } from '../../common/validations/params.validation';
import catchAsync from '../../common/utils/catchAsync';

export const createSchoolAdminController = catchAsync(async (req: Request, res: Response) => {
    const validateData = createSchoolAdminSchema.parse(req.body);
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await createSchoolAdminService(schoolId, validateData);
    res.status(201).json(result);
});

export const getAllSchoolsController = catchAsync(async (req: Request, res: Response) => {
    const query = getAllSchoolsSchema.parse(req.query);
    const result = await getAllSchoolsService(query);
    res.status(200).json(result);
});

export const getSchoolByIdController = catchAsync(async (req: Request, res: Response) => {
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await getSchoolByIdService(schoolId);
    res.status(200).json(result);
});

export const getSchoolAdminsController = catchAsync(async (req: Request, res: Response) => {
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await getSchoolAdminsService(schoolId);
    res.status(200).json(result);
});

export const updateSchoolController = catchAsync(async (req: Request, res: Response) => {
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const body = updateSchoolSchema.parse(req.body);
    const result = await updateSchoolService(schoolId, body);
    res.status(200).json(result);
});

export const softDeleteSchoolController = catchAsync(async (req: Request, res: Response) => {
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await softDeleteSchoolService(schoolId);
    res.status(200).json(result);
});

export const restoreSchoolController = catchAsync(async (req: Request, res: Response) => {
    const { schoolId } = schoolIdParamsSchema.parse(req.params);
    const result = await restoreSchoolService(schoolId);
    res.status(200).json(result);
});

/*
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Yjc2YzBkOC1lNzUxLTRkMjUtODdmNi02N2UzYzM5OGNiMDEiLCJlbWFpbCI6InN1cGVyYWRtaW5Ac21zLmNvbSIsInNjaG9vbElkIjoiMjMzODllYTUtZTllNy00MmFiLThjYjQtZGViY2RjMzRiNGUwIiwiaWF0IjoxNzg0ODk3NTQ4LCJleHAiOjE3ODYxOTM1NDh9.l4J2a6fShNaKkwSJfhnaSaTJuubU3Eq0ebejeS0dUFM",
  "user": {
    "id": "5b76c0d8-e751-4d25-87f6-67e3c398cb01",
    "name": "Super Admin",
    "email": "superadmin@sms.com"
  }
}
*/