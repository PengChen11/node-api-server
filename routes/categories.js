'use strict';

const express = require('express');
const router = express.Router();
const categories = require('../lib/models/categories/categories-model.js');

// Define our routes
router.get('/categories', getCategories);
router.post('/categories', postCategories);

function getCategories(req, res, next) {
  categories.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function postCategories(req, res, next) {
  categories.create(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

module.exports = router;
