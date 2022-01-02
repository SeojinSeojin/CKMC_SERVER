import { NextFunction, Response, Request } from 'express';
import { Work } from '../db/schema';
import { koreanConsonantRegex } from '../utils/koreanConsonantRegex';

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
        hashTags: { $in: hashTags },
        authorName: { $regex: authorNameRegex },
        title: { $regex: workTitle },
      });
      return res.status(200).json(works);
    } else {
      const works = await Work.find({
        authorName: { $regex: authorNameRegex },
        title: { $regex: workTitle },
      });
      return res.status(200).json(works);
    }
  } catch (error) {
    next(error);
  }
};
