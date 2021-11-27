import { Router } from 'express';
import { getAuthorsByClass } from '../controllers/authors.controller';

export const authorRouter = Router();

authorRouter.get('/class', getAuthorsByClass);
