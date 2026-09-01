import { Request, Response } from 'express';
import { createStudentService, getStudentByIdService, getStudentsService, updateStudentService } from './student.service';
import { getStudentQuerySchema, studentIdParamSchema, updateStudentSchema } from './student.validation';
import catchAsync from '../../common/utils/catchAsync';

export const createStudentController = catchAsync(async (req: Request, res: Response) => {
    const result = await createStudentService(req.user!.schoolId, req.body)
    res.status(201).json(result);
});

export const getStudentController = catchAsync(async (req: Request, res: Response) => {
    const { page, limit } = getStudentQuerySchema.parse(req.query);
    const result = await getStudentsService(req.user!.schoolId, page, limit);
    res.json(result);
});

export const getStudentByIdController = catchAsync(async (req: Request, res: Response) => {
    const { id } = studentIdParamSchema.parse(req.params);
    const student = await getStudentByIdService(req.user!.schoolId, id);
    res.json(student);
});

export const updateStudentController = catchAsync(async (req: Request, res: Response) => {
    const {id} = studentIdParamSchema.parse(req.params);
    const data = updateStudentSchema.parse(req.body);
    const result = await updateStudentService(req.user!.schoolId, id, data);
    res.status(200).json(result);
});