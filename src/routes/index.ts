import { Router } from 'express';
import { userRouter } from './users';
import { authorRouter } from './authors';
import { letterRouter } from './letters';

const router = Router();

router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/letter', letterRouter);

export default router;
