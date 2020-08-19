'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const server = require('./lib/server.js');

const MONGODB_URL = process.env.DB_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URL, mongooseOptions);

server.start();
