'use strict';
require('dotenv').config();

const express = require('express');
const app = express();

// Global Middleware ...
app.use(express.json());

//import from custom routes
// const productsRoutes = require('../routes/products.js');
// const categoriesRoutes = require('../routes/categories.js');

// Custom Routes
const apiRouter = require('./routes/v1');


//middleware
const logRequest = require('./middleware/logger.js');
const notFoundHandler = require('./middleware/404.js');
const timeStamp = require('./middleware/timestamp');
const errorHandler = require('./middleware/500.js');

app.use(logRequest);
app.use(timeStamp);

// Actual Routes
app.use(apiRouter);

// app.use('/api/v1/', productsRoutes);
// app.use('/api/v1/', categoriesRoutes);


// because these are defined last, they end up as catch-alls.
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
