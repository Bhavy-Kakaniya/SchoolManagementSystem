import { RoleName } from "@prisma/client";
import { Router } from "express";
import { createSchoolController } from "./school.controller";
import authMiddleware from "../../common/middleware/auth.middleware";
import { requireRoles } from "../../common/middleware/authorization.middleware";

const router = Router();

router.post('/', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolController);

export default router;