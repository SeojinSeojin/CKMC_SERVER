import { Router } from 'express';
import {
  deleteEpisode,
  getEpisodeByAuthorAndIndex,
  postEpisode,
} from '../controllers/episodes.controller';

export const episodeRouter = Router();

episodeRouter.post('/', postEpisode);
episodeRouter.delete('/:episodeIdx', deleteEpisode);
episodeRouter.get('/:authorName/:episodeIdx', getEpisodeByAuthorAndIndex);
