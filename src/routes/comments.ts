import { Router } from 'express';
import {
  getCommentByID,
  getCommentsByEpisode,
  patchComment,
  postComments,
} from '../controllers/comments.controller';

export const commentRouter = Router();

commentRouter.post('/', postComments);
commentRouter.get('/', getCommentByID);
commentRouter.get('/episode', getCommentsByEpisode);
commentRouter.patch('/', patchComment);
