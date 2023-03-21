const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./database/mongodb');
const registerRoute = require('./api/route/RegisterRoute');


/** for connecting to the mongoDB database **/
connectToMongoDb();

/** for avoiding cors error **/
app.use(cors());

/** for converting the data **/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/** routes **/
app.use('/api', registerRoute);

module.exports = app;
