import { Router } from 'express';
import { userRouter } from './users';
import { authorRouter } from './authors';
import { letterRouter } from './letters';
import { workRouter } from './works';

const router = Router();

router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/letter', letterRouter);
router.use('/work', workRouter);

export default router;
