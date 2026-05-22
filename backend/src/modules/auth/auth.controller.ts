import { Request, Response } from "express";
import { getMeService, loginUserService, logoutService, refreshTokenService } from "./auth.service";

export const loginController = async(req: Request, res: Response) => {
    const result = await loginUserService(req.body);
    res.json(result);
}

export const refreshTokenController = async(req: Request, res: Response) => {
    const result = await refreshTokenService();
    res.json(result);
}

export const logoutController = async(req: Request, res: Response) => {
    const result = await logoutService();
    res.json(result);
}

export const getMeController = async(req: Request, res: Response) => {
    const result = await getMeService();
    res.json(result);
}