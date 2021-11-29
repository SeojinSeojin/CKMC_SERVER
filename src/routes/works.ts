import { Router } from 'express';
import {
  getWorksByFilter,
  getWorksByPage,
} from '../controllers/works.controller';

export const workRouter = Router();

workRouter.get('/all', getWorksByPage);
workRouter.get('/filter', getWorksByFilter);
