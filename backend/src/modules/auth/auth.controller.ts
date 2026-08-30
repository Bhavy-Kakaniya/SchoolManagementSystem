import { Request, Response } from "express";
import { getMeService, loginUserService, logoutService, refreshTokenService } from "./auth.service";
import catchAsync from "../../common/utils/catchAsync";

export const loginController = catchAsync(async (req: Request, res: Response) => {
    const result = await loginUserService(req.body);
    res.json(result);
});

export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
    const result = await refreshTokenService();
    res.json(result);
});

export const logoutController = catchAsync(async (req: Request, res: Response) => {
    const result = await logoutService();
    res.json(result);
});

export const getMeController = catchAsync(async (req: Request, res: Response) => {
    const result = await getMeService(req.user!.userId);
    res.json({
        message: "Authorized user",
        ...result
    });
});