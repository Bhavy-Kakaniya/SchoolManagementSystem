import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from '../../errors/AppError';

export const loginUserService = async (payload: { email: string, password: string }) => {

    // later also use school id for query so that find unique can be used and also it will
    //  allow 1 person working in more schools logic (tenant architecture).
    const user = await prisma.user.findFirst({
        where: {
            email: payload.email,
        },
    });

    if (!user)
        throw new Error("User not found");

    // check password
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched)
        throw new AppError(401, "Invalid username or password")

    // provide token to user who had logged in
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            // roles: user.roles, add this later after setup is complete
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: "15d" as const,
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
}

export const refreshTokenService = async () => {
    return {
        message: "refresh token service"
    }
}

export const logoutService = async () => {
    return {
        message: "logout service"
    }
}

export const getMeService = async () => {
    return {
        message: "get me service"
    }
}