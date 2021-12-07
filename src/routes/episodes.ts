import { Router } from 'express';
import {
  getEpisodeByAuthorAndIndex,
  postEpisode,
} from '../controllers/episodes.controller';

export const episodeRouter = Router();

episodeRouter.post('/', postEpisode);
episodeRouter.get('/:authorName/:episodeIdx', getEpisodeByAuthorAndIndex);
