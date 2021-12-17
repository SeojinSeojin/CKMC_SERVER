import { NextFunction, Response } from 'express';
import { Work } from '../db/schema';
import { CommentData } from '../types';
import { CustomRequest } from '../types/API';

interface PostCommentData extends CommentData {
  authorName: string;
  episodeIndex: number;
}

export const postComments = (
  req: CustomRequest<PostCommentData>,
  res: Response,
  next: NextFunction
) => {
  const { authorName, episodeIndex, ...comment } = req.body;
  const work = Work.findOne({ authorName: authorName });
};
