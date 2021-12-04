import { Router } from 'express';
import {
  getAuthorsByClass,
  patchAuthorInfo,
} from '../controllers/authors.controller';

export const authorRouter = Router();

authorRouter.get('/class', getAuthorsByClass);
authorRouter.patch('/edit', patchAuthorInfo);
