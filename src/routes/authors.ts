import { Router } from 'express';
import {
  getAuthorById,
  getAuthorsByClass,
  patchAuthorInfo,
} from '../controllers/authors.controller';

export const authorRouter = Router();

authorRouter.get('/class', getAuthorsByClass);
authorRouter.get('/:id', getAuthorById);
authorRouter.patch('/edit', patchAuthorInfo);
