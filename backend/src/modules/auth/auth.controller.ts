import { Request, Response } from "express";
import { getMeService, loginUserService, logoutService, refreshTokenService } from "./auth.service";
import catchAsync from "../../common/utils/catchAsync";
import { loginSchema } from "./auth.validation";

export const loginController = catchAsync(async (req: Request, res: Response) => {
    const payload = await loginSchema.parse(req.body);
    const result = await loginUserService(payload);
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