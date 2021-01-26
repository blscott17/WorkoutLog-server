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
