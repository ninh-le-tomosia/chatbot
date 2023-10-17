require('dotenv').config();
require('express-async-errors');

// packages
import fs         from 'fs';
import morgan     from 'morgan';
import cors       from 'cors';
import helmet     from 'helmet';
import bodyParser from 'body-parser';
import express    from 'express';
import path       from 'path';
import passport   from 'passport';
import session    from 'express-session';

const app  = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream('./log/development.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));
app.use(express.json());
app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET_TOKEN,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// security packages
app.use(helmet());

// config log request
import Log from './utils/logger';
app.use(Log.logRequest);

//static folder
app.use('/', express.static(path.join(__dirname, 'public')));

// database config
import './config/database.conf';

// passport setup
import './utils/passport';

// routes
import appRoutes from './config/routes.conf';
app.use('/', appRoutes);

app.post('/chat', (req, res) => {
  console.log(req.body)
  debugger
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
