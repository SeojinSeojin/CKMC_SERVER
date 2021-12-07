import { NextFunction, Response, Request } from 'express';
import { Author, Episode, User, Work } from '../db/schema';
import { AuthorData, EpisodeData } from '../types';
import { CustomRequest } from '../types/API';

export const postEpisode = async (
  req: CustomRequest<EpisodeData>,
  res: Response,
  next: NextFunction
) => {
  const author = req.session.author;
  if (!author) return res.status(400).send('세션에 유저가 저장되어 있지 않음');

  const { viewMethod, title, description, thumbnail, link, pages } = req.body;
  const episodeIdx = author.work.episodes.length;
  const episode = new Episode({
    title,
    thumbnail,
    link,
    description,
    pages,
    viewMethod,
    authorName: author.nickName,
    index: episodeIdx,
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

export const getEpisodeByAuthorAndIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorName, episodeIdx } = req.params;
  const author: AuthorData = await Author.findOne({ nickName: authorName });
  if (!author) return res.status(400).send('유효하지 않은 작가 이름');

  const episodes = author.work.episodes;
  if (episodes.length < +episodeIdx)
    return res.status(400).send('유효하지 않은 작품 회차');

  const episode = author.work.episodes.find(
    (episode) => episode.index === +episodeIdx
  );
  return res.status(200).json({ author, episode });
};

export const patchEpisode = async (
  req: CustomRequest<EpisodeData>,
  res: Response,
  next: NextFunction
) => {
  const author = req.session.author;
  if (!author) return res.status(400).send('세션에 유저가 저장되어 있지 않음');
  const { viewMethod, title, description, thumbnail, link, pages, index } =
    req.body;

  if (index === undefined || author.work.episodes.length < index)
    return res.status(400).send('유효하지 않은 작품 회차');

  await Episode.replaceOne(
    { authorName: author.nickName, index: index },
    {
      title,
      thumbnail,
      link,
      description,
      pages,
      viewMethod,
      authorName: author.nickName,
      index,
    }
  );

  const episodes = author.work.episodes;
  const newEpisodes = episodes.map((episode) => {
    if (episode.index === index)
      return {
        title,
        thumbnail,
        link,
        description,
        pages,
        viewMethod,
        authorName: author.nickName,
        index,
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
  req.session.author = newAuthor;

  res.status(200).json(newAuthor);
};

export const deleteEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const author = req.session.author;
  if (!author) return res.status(400).send('세션에 유저가 저장되어 있지 않음');

  const { episodeIdx } = req.params;
  const episodes = author.work.episodes;
  if (episodes.length < +episodeIdx || +episodeIdx < 0)
    return res.status(400).send('유효하지 않은 작품 회차');

  episodes.splice(+episodeIdx, 1);
  await Episode.deleteOne({ index: episodeIdx, authorName: author.nickName });

  await Work.updateOne(
    { authorName: author.nickName },
    { $set: { episodes: episodes } }
  );
  const work = await Work.findOne({ authorName: author.nickName });

  await Author.updateOne({ _id: author._id }, { $set: { work: work } });
  const newAuthor = await Author.findOne({ _id: author._id });

  await User.updateOne(
    { 'author._id': author._id },
    { $set: { author: newAuthor } }
  );
  req.session.author = newAuthor;

  res.status(200).json(newAuthor);
};
