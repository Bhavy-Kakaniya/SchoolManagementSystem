import { Request, Response, NextFunction } from 'express';
import { createStudentService, getStudentsService } from './student.service';
import { getStudentQuerySchema } from './student.validation';

export const createStudentController = async (req: Request, res: Response) => {
    const result = await createStudentService(req.user!.schoolId, req.body)
    res.status(201).json(result);
}

export const getStudentController = async (req: Request, res: Response) => {
    const { page, limit } = getStudentQuerySchema.parse(req.query);

    const result = await getStudentsService(req.user!.schoolId, page, limit);

    res.json(result);
}