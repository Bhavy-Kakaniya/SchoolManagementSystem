import { JwtPayload } from "jsonwebtoken";

// type augmentation :- extended express' default REQUEST type which is by default .body, .params, 
// now we can use req.user

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                userId: string;
                email: string;
                schoolId: string;
            }
        }
    }
}

export { };