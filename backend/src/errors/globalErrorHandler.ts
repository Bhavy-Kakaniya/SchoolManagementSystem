import { NextFunction, Request, Response  } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if (err instanceof ZodError) {
        statusCode = 400;
        message = err.issues[0]?.message;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
}

export default globalErrorHandler;