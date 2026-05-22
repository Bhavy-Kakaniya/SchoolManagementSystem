import prisma from "../../config/prisma"

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

    return {
        message: "Login successful",
        user,
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