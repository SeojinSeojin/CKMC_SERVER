import mongoose, { Schema, model } from 'mongoose';
import { PageData } from '../../types';

const pageSchema = new Schema<PageData>({
  url: { type: String, required: true },
});

pageSchema.set('timestamps', true);

let Page = mongoose.models.Letter || model<PageData>('Page', pageSchema);

export default Page;
