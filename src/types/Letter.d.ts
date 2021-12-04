import { ObjectId } from 'mongodb';

export default interface LetterData {
  _id: ObjectId;
  title: string;
  body: string;
  sender: string;
  file: string;
  createdAt: string;
}
