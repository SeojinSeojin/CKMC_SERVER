import WorkData from './Work';
import { ObjectId } from 'mongodb';

export default interface AuthorData {
  _id: ObjectId;
  name: string;
  number: string;
  projectClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  nickName: string;
  contact: string;
  work: WorkData;
}
