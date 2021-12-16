import { Router } from 'express';
import {
  getSessionUser,
  postLogin,
  postLogout,
} from '../controllers/users.controller';

export const userRouter = Router();

userRouter.get('/', getSessionUser);
userRouter.post('/login', postLogin);
userRouter.post('/logout', postLogout);
