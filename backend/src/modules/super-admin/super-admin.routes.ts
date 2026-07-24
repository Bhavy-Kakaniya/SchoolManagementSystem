import { RoleName } from "@prisma/client";
import { Router } from "express";
import { createSchoolAdminController, getSchoolsController } from "./super-admin.controller";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';

const router = Router();

router.post('/schools/:schoolId/admin', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolAdminController);
router.get('/schools', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), getSchoolsController);

export default router;