import mongoose, { Schema, model } from 'mongoose';
import { HashTagData } from '../../types';
import Work from './Work';

const hashTagSchema = new Schema<HashTagData>({
  tag: { type: String, required: true },
  works: { type: [Work.schema], default: [] },
});

hashTagSchema.set('timestamps', true);

let HashTag =
  mongoose.models.HashTag || model<HashTagData>('HashTag', hashTagSchema);

export default HashTag;
