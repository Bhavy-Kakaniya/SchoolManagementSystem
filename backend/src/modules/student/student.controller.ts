import { Request, Response, NextFunction } from 'express';
import { createStudentService } from './student.service';

export const createStudentController = async (req: Request, res: Response) => {
    const result = await createStudentService(req.user!.schoolId, req.body)
    res.status(201).json(result);
}