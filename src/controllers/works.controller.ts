import { NextFunction, Response, Request } from 'express';
import { Work } from '../db/schema';
import { WorkData } from '../types';
import { koreanConsonantRegex } from '../utils/koreanConsonantRegex';

export const getWorksByPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 0 } = req.query;
    const works: Array<WorkData> = await Work.find()
      .skip(Number(page) * 30)
      .limit(30);

    return res.status(200).json(works);
  } catch (error) {
    next(error);
  }
};

export const getWorksByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      hashTags: hashTagString = '',
      authorFirstName = '',
      workTitle = '',
      authorName = '',
    } = req.query;

    const hashTags = (hashTagString as string)
      .split(',')
      .filter((tag) => tag !== '');
    const authorNameRegex =
      authorFirstName === ''
        ? authorName
        : koreanConsonantRegex(authorFirstName as string);
    if (hashTags.length) {
      const works = await Work.find({
        hashTags: { $all: hashTags },
        authorName: { $regex: authorNameRegex },
        workTitle: { $regex: workTitle },
      });
      return res.status(200).json(works);
    } else {
      const works = await Work.find({
        authorName: { $regex: authorNameRegex },
        workTitle: { $regex: workTitle },
      });
      return res.status(200).json(works);
    }
  } catch (error) {
    next(error);
  }
};
