import { NextFunction, Response, Request } from 'express';
import { Author, Episode, User, Work } from '../db/schema';
import { EpisodeData } from '../types';
import { CustomRequest } from '../types/API';

export const postEpisode = async (
  req: CustomRequest<EpisodeData>,
  res: Response,
  next: NextFunction
) => {
  const author = req.session.author;
  if (!author) return res.status(400).send('세션에 유저가 저장되어 있지 않음');

  const {
    viewMethod,
    title,
    description,
    isForNineteen,
    thumbnail,
    link,
    pages,
  } = req.body;

  const episode = new Episode({
    title,
    thumbnail,
    link,
    description,
    isForNineteen,
    pages,
    viewMethod,
    authorName: author.nickName,
  });
  await episode.save();

  await Work.updateOne(
    { _id: author.work._id },
    { $push: { episodes: episode } }
  );

  const newWork = await Work.findOne({ _id: author.work._id });

  await Author.updateOne({ _id: author._id }, { $set: { work: newWork } });

  const newAuthor = await Author.findOne({ _id: author._id });

  await User.updateOne(
    { 'author._id': author._id },
    { $set: { author: newAuthor } }
  );

  req.session.author = newAuthor;
  return res.status(200).json(newAuthor);
};
