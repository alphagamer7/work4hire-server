// Libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//firebase
const firebase = require('firebase');
const firebaseConfig = require('./config/firebaseConfig');

firebase.initializeApp(firebaseConfig);

const rootPath = ''; // If there is a root path otherwise use empty string..
const logger = require('./utils/logger'); // This logger will logs errors and others useful information on the logs folder to ease debugging.

// Routes
const rootRoute = require('./routes/root');

// Configs
const app = express();
const port = process.env.PORT || 5000;
console.log("port",port);
// MiddleWares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root Route
app.use(`/${rootPath}`, rootRoute);


// 404 - Not Found
app.use((req, res) => {
  res.status(404).send('Path not found.');
});

// Starting Node.js server log
logger.info({
  label: 'server',
  message: 'Starting REST api server.',
});

app.listen(
  port,
  logger.info({
    label: 'server',
    message: 'Listening in port: ' + port,
  })
);
