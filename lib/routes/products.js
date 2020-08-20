'use strict';

const express = require('express');
const router = express.Router();
const products = require('../models/products/products-model.js');

// Define our routes
router.get('/products', getProducts);
router.post('/products', postProducts);

function getProducts(req, res, next) {
  products.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function postProducts(req, res, next) {
  products.create(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

module.exports = router;
