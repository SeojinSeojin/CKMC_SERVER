import { Router } from 'express';
import { getWorksByFilter } from '../controllers/works.controller';

export const workRouter = Router();

workRouter.get('/filter', getWorksByFilter);
