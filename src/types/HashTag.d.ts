import WorkData from './Work';
import { ObjectId } from 'mongodb';

export default interface HashTagData {
  _id: ObjectId;
  tag: string;
  works: WorkData[];
}
