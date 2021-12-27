import { NextFunction, Response } from 'express';
import { Author, Comment, Episode, User, Work } from '../db/schema';
import { CommentData, EpisodeData } from '../types';
import { CustomRequest } from '../types/API';

interface PostCommentData {
  authorName: string;
  episodeIndex: number;
  username: string;
  password: string;
  content: string;
}

export const postComments = async (
  req: CustomRequest<PostCommentData>,
  res: Response,
  next: NextFunction
) => {
  const { authorName, episodeIndex, ...commentBody } = req.body;

  const author = await Author.findOne({ nickName: authorName });
  if (!author) return res.status(400).send('존재하지 않는 작가명');
  if (episodeIndex === undefined || author.work.episodes.length < episodeIndex)
    return res.status(400).send('유효하지 않은 작품 회차');

  const comment = new Comment({
    username: commentBody.username,
    password: commentBody.password,
    content: commentBody.content,
    authorName: authorName,
    episodeIndex: episodeIndex,
  });

  await comment.save();

  await Episode.updateOne(
    { authorName, index: episodeIndex },
    {
      $push: { comments: comment },
    }
  );

  const episodes = author.work.episodes;
  const newEpisodes = episodes.map((episode: EpisodeData) => {
    if (episode.index === episodeIndex)
      return {
        ...episode,
        comments: episode.comments ? [...episode.comments, comment] : [comment],
      };
    else return episode;
  });

  await Work.updateOne(
    { authorName: author.nickName },
    { $set: { episodes: newEpisodes } }
  );
  const work = await Work.findOne({ authorName: author.nickName });

  await Author.updateOne({ _id: author._id }, { $set: { work: work } });
  const newAuthor = await Author.findOne({ _id: author._id });

  await User.updateOne(
    { 'author._id': author._id },
    { $set: { author: newAuthor } }
  );

  return res.status(200).json({ comment });
};
