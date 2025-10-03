import { join } from 'node:path';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routes from './routes/index.js';

dotenv.config();
console.log(process.env.JWT_SECRET);

const __dirname = import.meta.dirname;
const staticPath = join(__dirname, 'public');

const port = process.env.APP_PORT || 8000;
const host = process.env.APP_HOST || 'localhost';
const mongo_url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/session';
const session_secret = process.env.SESSION_SECRET || 'session-secret';

const server = express();

server.set('view engine', 'pug');

server.use(express.static(staticPath));
server.use(express.urlencoded({ extended: false }));
server.use(
  session({
    name: 'shop-session',
    secret: session_secret,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongo_url }),
  })
);

server.use(routes);

server.listen(port, host, () => {
  console.log(`Application running at http://${host}:${port}`);
});
