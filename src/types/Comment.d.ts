import { ObjectId } from 'mongodb';

export default interface CommentData {
  _id: ObjectId;
  username: string;
  password: string;
  content: string;
  authorName: string;
  episodeIndex: string;
}
