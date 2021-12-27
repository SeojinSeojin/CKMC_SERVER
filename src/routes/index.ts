import { Router } from 'express';
import { userRouter } from './users';
import { authorRouter } from './authors';
import { letterRouter } from './letters';
import { workRouter } from './works';
import { episodeRouter } from './episodes';
import { commentRouter } from './comments';

const router = Router();

router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/letter', letterRouter);
router.use('/work', workRouter);
router.use('/episode', episodeRouter);
router.use('/comment', commentRouter);

export default router;
