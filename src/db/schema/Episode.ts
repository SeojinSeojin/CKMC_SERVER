import mongoose, { Schema, model } from 'mongoose';
import { EpisodeData } from '../../types';
import Comment from './Comment';

const episodeSchema = new Schema<EpisodeData>({
  viewMethod: { type: String, required: true },
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  thumbnail: { type: Schema.Types.Mixed, required: true },
  description: { type: String },
  link: { type: String },
  index: { type: Number },
  pages: { type: [Schema.Types.Mixed], default: [] },
  comments: { type: [Comment.schema], default: [] },
});

episodeSchema.set('timestamps', true);

let Episode =
  mongoose.models.Episode || model<EpisodeData>('Episode', episodeSchema);

export default Episode;
