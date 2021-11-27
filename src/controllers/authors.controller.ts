import { NextFunction, Response, Request } from 'express';
import authors from '../db/statics/authorInClass';

export const getAuthorsByClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json(authors);
};
