import { Router } from "express";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';
import { RoleName } from "@prisma/client";
import { createStudentController, deactivateStudentController, getStudentByIdController, getStudentController, updateStudentController } from "./student.controller";

const router = Router();

router.post('/', authMiddleware, requireRoles(RoleName.ADMIN), createStudentController);
router.get('/', authMiddleware, requireRoles(RoleName.ADMIN, RoleName.PRINCIPAL, RoleName.TEACHER), getStudentController);
router.get('/:id', authMiddleware, requireRoles(RoleName.ADMIN, RoleName.PRINCIPAL, RoleName.TEACHER), getStudentByIdController);
router.put("/:id", authMiddleware, requireRoles(RoleName.ADMIN), updateStudentController);
router.patch("/:id/deactivate", authMiddleware, requireRoles(RoleName.ADMIN), deactivateStudentController);

export default router;