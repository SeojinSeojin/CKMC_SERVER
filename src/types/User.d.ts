import AuthorData from './Author';
import { ObjectId } from 'mongodb';

export default interface UserData {
  _id: ObjectId;
  studentNumber: string;
  loginId: string;
  password: string;
  author: AuthorData;
}
