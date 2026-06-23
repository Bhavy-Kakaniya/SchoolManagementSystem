import { createSchoolService } from "./school.service";
import { createSchoolSchema } from "./school.validation"
import { Request, Response } from "express";

export const createSchoolController = async (req: Request, res: Response) => {
    const validate = createSchoolSchema.parse(req.body);
    const result = await createSchoolService(validate);
    res.status(201).json(result);
}