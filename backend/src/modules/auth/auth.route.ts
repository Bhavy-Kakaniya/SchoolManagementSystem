import { Router } from 'express';
import { getMeController, loginController, logoutController, refreshTokenController } from './auth.controller';
import authMiddleware from '../../common/middleware/auth.middleware';

const router = Router();

router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);
router.get('/me', authMiddleware, getMeController);

export default router;