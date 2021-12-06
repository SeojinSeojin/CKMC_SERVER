import { Router } from 'express';
import { postEpisode } from '../controllers/episodes.controller';

export const episodeRouter = Router();

episodeRouter.post('/', postEpisode);
