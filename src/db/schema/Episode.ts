import mongoose, { Schema, model } from 'mongoose';
import { EpisodeData } from '../../types';
import Comment from './Comment';

const episodeSchema = new Schema<EpisodeData>({
  viewMethod: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  isForNineteen: { type: Boolean, required: true },
  link: { type: String },
  pages: { type: [String], default: [] },
  comments: { type: [Comment.schema], default: [] },
});

episodeSchema.set('timestamps', true);

let Episode =
  mongoose.models.Episode || model<EpisodeData>('Episode', episodeSchema);

export default Episode;
