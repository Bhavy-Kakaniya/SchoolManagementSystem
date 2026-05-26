import { NextFunction, Request, Response } from "express";
import { getMeService, loginUserService, logoutService, refreshTokenService } from "./auth.service";
import catchAsync from "../../common/utils/catchAsync";

export const loginController = catchAsync(
    async (req: Request, res: Response) => {
        const result = await loginUserService(req.body);
        res.json(result);
    }
)

export const refreshTokenController = async(req: Request, res: Response) => {
    const result = await refreshTokenService();
    res.json(result);
}

export const logoutController = async(req: Request, res: Response) => {
    const result = await logoutService();
    res.json(result);
}

export const getMeController = async(req: Request, res: Response) => {
    res.json({
        message: "Authorized user",
        user: req.user
    });
}