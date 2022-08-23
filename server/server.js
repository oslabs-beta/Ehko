const path = require('path');
require('dotenv').config();
const express = require('express');
const apiController = require('./controllers/apiController');
const dbController = require('./controllers/dbController');

// TODO: remove this once we confirm that dotenv is working properly.
// console.log(process.env);

// changed from 3000 to 443 - port 443 is standard for HTTPS (secure); port 80 is standard for HTTP (plain text)
// https://www.techopedia.com/definition/15709/port-80#:~:text=Port%2080%20is%20the%20port,and%20receive%20unencrypted%20web%20pages.
const PORT = 443;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// temp static serving of frontend for testing - probably want to change
server.use(express.static(path.join(__dirname, '../client')));

/* what are the routes we need? shouldn't be a ton:
* - We accept POST requests from the legacy stack for each trial
* - We accept responses from the microservice stack for each trial, but that's not a separate route
* - For the visualization side of things, we accept some complex inputs and query the DB
* so... just 2 then?
* don't think we need a routes folder. we can refactor later if we need to
*/

server.post(
  '/',
  (req, res, next) => {
    res.sendStatus(200);
    return next();
  },
  apiController.validateBody,
  apiController.callCandidateMicroservice
  /* perform comparison logic  */
  /* commit response to DB */
);

// catch-all route handler for any requests to an unknown route
server.use('*', (req, res) => res.status(404).send('This is not a valid route.'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 * Note: we aren't sending back error messages, so all we're doing is logging the error.
 */
server.use((err, req, res, next) => {
  const defaultErr = 'Express error handler caught unknown middleware error';
  const error = err || defaultErr;
  console.log(error);
});

// NK: We need to export the listener so Jest can run it.
module.exports = server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
