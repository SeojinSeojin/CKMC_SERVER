import { NextFunction, Request, Response } from 'express';
import { Letter } from '../db/schema';
import { LetterData } from '../types';
import { CustomRequest } from '../types/API';
import { ObjectId } from 'mongodb';

interface MongoLetterData extends LetterData {
  _id: ObjectId;
}

export const getLetters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const page = query.page ? Number(query.page) : 0;
  const mode = query.mode ? Number(query.mode) : 10;

  const lettersCount = await Letter.countDocuments({});

  const letters: Array<MongoLetterData> = await Letter.find()
    .sort({ _id: -1 })
    .skip(page * mode)
    .limit(mode);

  letters.map((doc) => ({
    ...doc,
    createdAt: doc._id.getTimestamp(),
  }));

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=180');

  return res.status(200).json({ letters, lettersCount });
};

type letterParams = {
  title: string;
  body: string;
  sender: string;
  file?: string | null;
};
export const postLetters = (
  req: CustomRequest<letterParams>,
  res: Response,
  next: NextFunction
) => {
  const { title, body: contentBody, sender, file } = req.body;

  const letter = new Letter({
    title,
    body: contentBody,
    sender,
    file: file ?? '',
  });

  letter.save();

  res.status(200).json({ isSuccess: true, letter });
};
