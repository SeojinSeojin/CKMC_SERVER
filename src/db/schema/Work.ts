import mongoose, { Schema, model } from 'mongoose';
import { WorkData } from '../../types';
import Episode from './Episode';

const workSchema = new Schema<WorkData>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorName: { type: String, required: true },
  thumbnail: { type: String, required: true },
  episodes: { type: [Episode.schema], default: [] },
  hashTags: { type: [String], required: false },
});

workSchema.set('timestamps', true);

let Work = mongoose.models.Work || model<WorkData>('Work', workSchema);

export default Work;
