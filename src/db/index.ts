import { MongoClientOptions } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Author, Letter, User, Work } from './schema';
import Comment from './schema/Comment';
import Episode from './schema/Episode';
import HashTag from './schema/HashTag';

dotenv.config();

let database: mongoose.Connection;

export async function createMongoConnection() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions;
  if (database) return;
  const mongodbURI = process.env.MONGODB_URI;
  await mongoose.connect(mongodbURI!, options);
  database = mongoose.connection;

  await User.createCollection();
  await Author.createCollection();
  await Comment.createCollection();
  await Episode.createCollection();
  await HashTag.createCollection();
  await Letter.createCollection();
  await Work.createCollection();

  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
}

export function disconnect() {
  if (!database) {
    return;
  }
  mongoose.disconnect();
}
