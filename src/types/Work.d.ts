import EpisodeData from './Episode';
import { ObjectId } from 'mongodb';

export default interface WorkData {
  _id: ObjectId;
  title: string;
  description: string;
  authorName: string;
  thumbnail: string;
  episodes: EpisodeData[];
  hashTags: Array<string>;
}
