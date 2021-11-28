import { Router } from 'express';
import { getLetters, postLetters } from '../controllers/letters.controller';

export const letterRouter = Router();

letterRouter.get('/', getLetters);
letterRouter.post('/', postLetters);
