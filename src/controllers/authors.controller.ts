import { NextFunction, Response, Request } from 'express';
import { Author, User, Work } from '../db/schema';
import authors from '../db/statics/authorInClass';
import { CustomRequest } from '../types/API';

export const getAuthorsByClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json(authors);
};

type patchAuthorParams = {
  contact: string;
  title: string;
  description: string;
  thumbnail: string;
  hashTags: Array<string>;
};
export const patchAuthorInfo = async (
  req: CustomRequest<patchAuthorParams>,
  res: Response,
  next: NextFunction
) => {
  const author = req.session.author;
  if (!author) return res.status(400).send('세션에 유저가 저장되어 있지 않음');

  const { contact, title, thumbnail, description, hashTags } = req.body;

  await Work.updateOne(
    { _id: author.work._id },
    {
      $set: {
        title: title,
        thumbnail: thumbnail,
        description: description,
        hashTags: hashTags,
      },
    }
  );

  const newWork = await Work.findOne({ _id: author.work._id });

  await Author.updateOne(
    { _id: author._id },
    {
      $set: { contact: contact, work: newWork },
    }
  );

  const newAuthor = await Author.findOne({ _id: author._id });

  await User.updateOne(
    { 'author._id': author._id },
    { $set: { author: newAuthor } }
  );

  req.session.author = newAuthor;
  return res.status(200).json(req.session.author);
};
