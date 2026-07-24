import { RoleName } from "@prisma/client";
import { Router } from "express";
import { createSchoolAdminController, getSchoolByIdController, getSchoolsController } from "./super-admin.controller";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';

const router = Router();

router.post('/schools/:schoolId/admin', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolAdminController);
router.get('/schools', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), getSchoolsController);
router.get('/schools/:id', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), getSchoolByIdController);

export default router;