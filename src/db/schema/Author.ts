import mongoose, { Schema, model } from 'mongoose';
import { AuthorData } from '../../types';

const authorSchema = new Schema<AuthorData>({
  name: { type: String, required: true },
  number: { type: String, required: true },
  projectClass: { type: String, required: true },
  nickName: { type: String },
  contact: { type: String, required: true },
  work: { type: Schema.Types.Mixed, required: true },
});

authorSchema.set('timestamps', true);

let Author =
  mongoose.models.Author || model<AuthorData>('Author', authorSchema);

export default Author;
