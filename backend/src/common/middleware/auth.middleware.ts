import { Request, Response, NextFunction } from 'express';
import AppError from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
        throw new AppError(401, "Unauthorized Access");

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
    );

    req.user = decoded;

    next();
}

export default authMiddleware;