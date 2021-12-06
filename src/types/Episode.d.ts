import CommentData from './Comment';
import { ObjectId } from 'mongodb';

export default interface EpisodeData {
  _id: ObjectId;
  viewMethod: 'scroll' | 'page' | 'link';
  title: string;
  description: string;
  isForNineteen: boolean;
  thumbnail: string;
  link?: string;
  pages?: string[];
  comments?: CommentData[];
}
