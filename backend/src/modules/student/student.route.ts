import { Router } from "express";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';
import { RoleName } from "@prisma/client";
import { createStudentController } from "./student.controller";
const router = Router();

router.post('/', authMiddleware, requireRoles(RoleName.ADMIN), createStudentController);

export default router;