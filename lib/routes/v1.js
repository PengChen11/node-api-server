'use strict';

const express = require('express');
const router = express.Router();
const getModel = require('../middleware/modelFinder')

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
