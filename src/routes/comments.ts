import { Router } from 'express';
import { postComments } from '../controllers/comments.controller';

export const commentRouter = Router();

commentRouter.post('/', postComments);
