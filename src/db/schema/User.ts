import mongoose, { Schema, model, connect } from 'mongoose';
import { UserData } from '../../types';

const userSchema = new Schema<UserData>({
  studentNumber: { type: String, required: true },
  loginId: { type: String, required: true },
  password: { type: String, required: true },
  author: { type: Schema.Types.Mixed, required: true },
});

userSchema.set('timestamps', true);

let User = mongoose.models.User || model<UserData>('User', userSchema);

export default User;
