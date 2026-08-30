import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from '../../errors/AppError';

export const loginUserService = async (payload: { email: string, password: string }) => {
    // later also use school id for query so that find unique can be used and also it will
    //  allow 1 person working in more schools logic (tenant architecture).
    const user = await prisma.user.findFirst({ where: { email: payload.email } });
    if (!user)
        throw new AppError(401, "Invalid UserName or Password");

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched)
        throw new AppError(401, "Invalid username or password")

    // provide token to user who had logged in
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            schoolId: user.schoolId
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: "15d"
        }
    );

    return {
        message: "Login successful",
        accessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};

export const getMeService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: { include: { role: true } } }
    });

    if(!user) {
        throw new AppError(404, "User not found");
    }

    const rolesArray = user.roles.map(userRole => userRole.role.name);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            schoolId: user.schoolId
        },
        rolesArray
    };
};

export const refreshTokenService = async () => {
    return {
        message: "refresh token service"
    }
};

export const logoutService = async () => {
    return {
        message: "logout service"
    }
};