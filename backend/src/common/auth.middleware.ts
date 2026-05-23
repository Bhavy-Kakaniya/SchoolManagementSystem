import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;

    if (!token)
        throw new Error("Unauthorized")

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
    );

    req.user = decoded;

    next();
}

export default auth;