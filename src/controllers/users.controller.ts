import { NextFunction, Response, Request } from 'express';
import { User } from '../db/schema';
import { CustomRequest } from '../types/API';
import { compare } from 'bcryptjs';
import { AuthorData } from '../types';

declare module 'express-session' {
  interface SessionData {
    author: AuthorData;
  }
}
type loginParams = { id: string; password: string };

export const getSessionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { author } = req.session;
    if (author) {
      if (!author.work.hashTags)
        return res
          .status(200)
          .json({ ...author, work: { ...author.work, hashTags: [] } });
      return res.status(200).json(author);
    }
    return res.status(201).json(null);
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (
  req: CustomRequest<loginParams>,
  res: Response,
  next: NextFunction
) => {
  const { id, password } = req.body;
  try {
    const loginUser = await User.findOne({ loginId: id });
    if (!loginUser) return res.status(400).send('존재하지 않는 아이디입니다.');
    if (!(await compare(password, loginUser.password)))
      return res.status(400).send('비밀번호가 일치하지 않습니다.');

    req.session.author = loginUser.author;
    res.status(200).send('로그인에 성공했습니다.');
  } catch (error) {
    next(error);
  }
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    else return res.status(200).send('로그아웃 성공');
  });
};
