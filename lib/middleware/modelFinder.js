'use strict';
const products = require('../models/products/products-model.js');
const categories = require('../models/categories/categories-model.js');

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

module.exports = getModel;
