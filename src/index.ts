import express, { Response } from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import { createMongoConnection } from './db';
import MongoDBStore from 'connect-mongodb-session';
import router from './routes';
const MongoDBSessionStore = MongoDBStore(session);
dotenv.config();

const initApp = async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  await createMongoConnection();

  const store = new MongoDBSessionStore({
    uri: process.env.MONGODB_URI!,
    collection: 'Sessions',
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      saveUninitialized: true,
      store: store,
    })
  );

  app.use('/api', router);

  httpServer.listen(8000, () => console.log('server is listening on', 8000));
};

initApp().catch((err) => console.log(err));
