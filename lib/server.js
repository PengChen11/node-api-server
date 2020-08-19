'use strict';
require('dotenv').config();

const express = require('express');

const app = express();

// Global Middleware ...
app.use(express.json());

//middleware
const logRequest = require('../middleware/logger.js');
const notFoundHandler = require('../middleware/404.js');
const timeStamp = require('../middleware/timestamp');
const errorHandler = require('../middleware/500.js');

app.use(logRequest);
app.use(timeStamp);


let db = {
  'categories': [
    {
      'name': 'pistol',
      'display_name': 'pistol',
      'description': 'a type of semi-auto hand gun',
      'id': 1,
    },
    {
      'name': 'revolver',
      'display_name': 'revolver',
      'description': 'a type of hand gun that have a revoving cylinder for ammo',
      'id': 2,
    },
  ],
  'products': [
    {
      'category': 'pistol',
      'name': 'glock_43',
      'display_name': 'glock 43',
      'description': 'a great little 9mm carry pistol',
      'id': 1,
    },
    {
      'category': 'revolver',
      'name': 'kimber_k6s',
      'display_name': 'Kimber k6s',
      'description': 'a great little .357 mag 6 round carry revolver',
      'id': 2,
    },
  ],
};

app.get('/api/v1/products', (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

app.get('/api/v1/products/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});


app.post('/api/v1/products', (req, res, next) => {
  let { name } = req.body;
  let record = { name };
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
});

app.put('/api/v1/products/:id', (req, res, next) => {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
});

app.delete('/api/v1/products/:id', (req, res, next) => {
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  res.json({});
});


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
