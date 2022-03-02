import { Router } from 'express';
import loginRouter from './loginRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(loginRouter);

export default router;