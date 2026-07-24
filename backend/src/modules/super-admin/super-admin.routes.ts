import { RoleName } from "@prisma/client";
import { Router } from "express";
import { createSchoolAdminController, getAllSchoolsController, getSchoolByIdController, softDeleteSchoolController, updateSchoolController } from "./super-admin.controller";
import authMiddleware from '../../common/middleware/auth.middleware';
import { requireRoles } from '../../common/middleware/authorization.middleware';
import { createSchoolController } from "../school/school.controller";

const router = Router();

router.post("/schools", authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolController);
router.post('/schools/:schoolId/admin', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), createSchoolAdminController);
router.get('/schools', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), getAllSchoolsController);
router.get('/schools/:schoolId', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), getSchoolByIdController);
router.put('/schools/:schoolId', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), updateSchoolController);
router.delete('/schools/:schoolId', authMiddleware, requireRoles(RoleName.SUPER_ADMIN), softDeleteSchoolController);

export default router;