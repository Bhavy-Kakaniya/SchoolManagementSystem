import { RoleName } from "@prisma/client";
import { Router } from "express";
import { createSchoolAdminController } from "./super-admin.controller";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';

const router = Router();

router.post('/schools/:schoolId/admin', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolAdminController);

export default router;