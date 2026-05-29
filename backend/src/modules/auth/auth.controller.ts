import { NextFunction, Request, Response } from "express";
import { getMeService, loginUserService, logoutService, refreshTokenService } from "./auth.service";
import catchAsync from "../../common/utils/catchAsync";
import prisma from "../../config/prisma";

export const loginController = catchAsync(
    async (req: Request, res: Response) => {
        const result = await loginUserService(req.body);
        res.json(result);
    }
)

export const refreshTokenController = async (req: Request, res: Response) => {
    const result = await refreshTokenService();
    res.json(result);
}

export const logoutController = async (req: Request, res: Response) => {
    const result = await logoutService();
    res.json(result);
}

export const getMeController = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { roles: { include: { role: true } } }
    })

    const rolesArray = user?.roles.map(userRole => userRole.role.name)

    res.json({
        message: "Authorized user",
        user: req.user,
        rolesArray
    });
}