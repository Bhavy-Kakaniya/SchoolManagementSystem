import { Router } from 'express';
import { getMeController, loginController, logoutController, refreshTokenController } from './auth.controller';

const router = Router();

router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);
router.get('/me', getMeController);

export default router;