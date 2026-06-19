import { Router } from "express";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';
import { RoleName } from "@prisma/client";
import { createStudentController, getStudentByIdController, getStudentController } from "./student.controller";
const router = Router();

router.post('/', authMiddleware, requireRoles(RoleName.ADMIN), createStudentController);
router.get('/', authMiddleware, requireRoles(RoleName.ADMIN, RoleName.PRINCIPAL, RoleName.TEACHER), getStudentController);
router.get('/:id', authMiddleware, requireRoles(RoleName.ADMIN, RoleName.PRINCIPAL, RoleName.TEACHER), getStudentByIdController)

export default router;