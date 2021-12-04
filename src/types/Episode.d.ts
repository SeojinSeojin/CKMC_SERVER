import CommentData from './Comment';
import PageData from './Page';
import { ObjectId } from 'mongodb';

export default interface EpisodeData {
  _id: ObjectId;
  workTitle: string;
  viewMethod: number;
  title: string;
  thumbnail: string;
  description: string;
  isForNineteen: boolean;
  link?: string;
  pages?: PageData[];
  comments: CommentData[];
}
