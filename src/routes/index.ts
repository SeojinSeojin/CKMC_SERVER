import { Router } from 'express';
import { userRouter } from './users';
import { authorRouter } from './authors';

const router = Router();

router.use('/user', userRouter);
router.use('/author', authorRouter);

export default router;
