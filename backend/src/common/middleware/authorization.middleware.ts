/*
-------------------------
Authorization Middleware
-------------------------
    This middleware handles Role-Based Access Control (RBAC).
    It verifies whether the authenticated user has permission to access protected routes
    based on assigned roles.

    Flow: JWT Authentication -> Fetch User Roles -> Role Validation

*/

import { Request, Response, NextFunction } from 'express';
import { RoleName } from '@prisma/client';
import prisma from '../../config/prisma';

export const requireRoles = (...roles: RoleName[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user)
            return res.status(401).json({ message: "unauthorized" });

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId, },
            include: { roles: { include: { role: true } } }
        });

        if (!user) // valid jwt may exists while user was deleted from DB
            return res.status(401).json({ message: "user not found" });

        // simplify user.roles[0].role.name to ['STUDENT', 'TEACHER']
        const userRolesArray = user.roles.map(userRole => userRole.role.name);

        // check whether user is having any role
        const hasRoles = roles.some(role => userRolesArray?.includes(role));

        if (!hasRoles)
            return res.status(403).json({ message: "Forbidden" });

        next();

    }
}