import { ObjectId } from 'mongodb';

export default interface PageData {
  _id: ObjectId;
  url: string;
}
