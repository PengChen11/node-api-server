'use strict';

const express = require('express');
const router = express.Router();

const products = require('../models/products/products-model.js');
const categories = require('../models/categories/categories-model.js');

// What we want is that /api/v1/<model>/ ends up using the right module from the models folder
// Let the class lead the "how" discussion and land on a simplistic solution like this one
// Lab will be for them to make this 100% dynamic and safe
function getModel(req, res, next) {
  let model = req.params.model; // This will be products, categories, whatever is after /api/v1

  // How can we get the right model into those functions?
  // Well,l middleware is really good at letting us put data on the request object
  // Lets do that and then get get ourselves back into the route handler
  switch (model) {
  case 'products':
    req.model = products;
    next();
    return;
  case 'categories':
    req.model = categories;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

router.param('model', getModel);

// Route Definitions
router.get('/api/v1/:model', handleGetAll);
router.get('/api/v1/:model/:id', handleGetOne);
router.post('/api/v1/:model', handlePost);
router.put('/api/v1/:model/:id', handleUpdate);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(req, res, next) {
  req.model.get()
    .then(results => {
      res.json(results);
    })
    .catch(next);
}

function handleGetOne(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(record => res.json(record))
    .catch(next);
}

function handlePost(req, res, next) {
  req.model.create(req.body)
    .then(result => res.json(result))
    .catch(next);
}

function handleUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then( result => res.json(result))
    .catch(next);
}

function handleDelete(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then( result => res.json(result))
    .catch(next);
}


module.exports = router;
