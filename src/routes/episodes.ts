import { Router } from 'express';
import {
  deleteEpisode,
  getEpisodeByAuthorAndIndex,
  patchEpisode,
  postEpisode,
} from '../controllers/episodes.controller';

export const episodeRouter = Router();

episodeRouter.post('/', postEpisode);
episodeRouter.patch('/', patchEpisode);
episodeRouter.delete('/:episodeIdx', deleteEpisode);
episodeRouter.get('/:authorName/:episodeIdx', getEpisodeByAuthorAndIndex);
