import mongoose, { Schema, model } from 'mongoose';
import { LetterData } from '../../types';

const letterSchema = new Schema<LetterData>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  sender: { type: String, required: true },
  file: { type: String, required: true },
});

letterSchema.set('timestamps', true);

let Letter =
  mongoose.models.Letter || model<LetterData>('Letter', letterSchema);

export default Letter;
