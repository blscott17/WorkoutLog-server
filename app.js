require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');

const log = require('./controllers/logcontroller');
const user = require('./controllers/usercontroller');

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());
// causes any route BELOW it to be able to use json to process the request.
app.use('/log', log);
app.use('/user', user);

app.listen(3000, function () {
  console.log('App is listening on port 3000');
});

// require('dotenv').config(); MUST be the First Line in app.js and allows us to make the secret
// user credentials available to our entire application. Also, allows us to hide secret user credentials
// from being uploaded to GitHub, to keep them from going Public
//
//sequelize.sync({force: true}) - drops table before create if model has changed. Only run ONCE, then
//comment out. Not the best idea for PROD code, Drop or Truncate table in the DB (Postgres, or other)
