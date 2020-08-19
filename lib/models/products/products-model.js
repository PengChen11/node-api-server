'use strict';

const schema = require('./products-schema.js');
const Model = require('../mongo.js');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

// Export an INSTANCE of a model
// This way, when a client requires us, they can just use the CRUD methods.
module.exports = new Product();
