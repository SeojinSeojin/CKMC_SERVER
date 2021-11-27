import mongoose, { Schema, model } from 'mongoose';
import { CommentData } from '../../types';

const commentSchema = new Schema<CommentData>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  content: { type: String, required: true },
});

commentSchema.set('timestamps', true);

let Comment =
  mongoose.models.Comment || model<CommentData>('Comment', commentSchema);

export default Comment;
