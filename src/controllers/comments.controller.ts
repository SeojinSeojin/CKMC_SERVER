import { NextFunction, Response, Request } from 'express';
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

  return res.status(200).json({ comment });
};

export const getCommentByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, commentID } = req.query;
  if (!username || !password || !commentID)
    return res.status(400).json({ message: '잘못된 요청 형식입니다.' });

  const comment: CommentData = await Comment.findById(commentID);
  if (comment.username !== username)
    return res.status(400).json({ message: '잘못된 유저이름입니다.' });
  if (comment.password !== password)
    return res.status(400).json({ message: '잘못된 비밀번호입니다.' });
  return res.status(200).json(comment);
};

export const getCommentsByEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorName, episodeIndex } = req.query;
  if (!authorName || !episodeIndex)
    return res.status(400).json({ message: '잘못된 요청 형식입니다.' });
  const comments: CommentData[] = await Comment.find({
    authorName,
    episodeIndex,
  });
  return res.status(200).json(comments);
};

export const patchComment = async (
  req: CustomRequest<CommentData>,
  res: Response,
  next: NextFunction
) => {
  const { username, password, _id, content } = req.body;
  if (!username || !password || !_id)
    return res.status(400).json({ message: '잘못된 요청 형식입니다.' });

  const comment: CommentData = await Comment.findById(_id);
  if (comment.username !== username)
    return res.status(400).json({ message: '잘못된 유저이름입니다.' });
  if (comment.password !== password)
    return res.status(400).json({ message: '잘못된 비밀번호입니다.' });
  await Comment.findByIdAndUpdate(_id, { $set: { content } });
  return res.status(200).json(comment);
};

export const deleteComment = async (
  req: CustomRequest<CommentData>,
  res: Response,
  next: NextFunction
) => {
  const { username, password, _id } = req.body;
  if (!username || !password || !_id)
    return res.status(400).json({ message: '잘못된 요청 형식입니다.' });

  const comment: CommentData = await Comment.findById(_id);
  if (comment.username !== username)
    return res.status(400).json({ message: '잘못된 유저이름입니다.' });
  if (comment.password !== password)
    return res.status(400).json({ message: '잘못된 비밀번호입니다.' });
  await Comment.findByIdAndDelete(_id);

  return res.status(200).json({ message: '삭제가 완료되었습니다.' });
};
