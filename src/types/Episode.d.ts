import CommentData from './Comment';
import PageData from './Page';
import { ObjectId } from 'mongodb';
import ImageData from './Image';

export default interface EpisodeData {
  _id: ObjectId;
  authorName: string;
  viewMethod: 'scroll' | 'page' | 'link';
  title: string;
  description?: string;
  thumbnail: ImageData;
  link?: string;
  pages?: PageData[];
  comments?: CommentData[];
  index?: number;
}
