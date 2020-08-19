'use strict';

const supergoose = require('@code-fellows/supergoose');

const products = require(`../lib/models/products/products-model.js`);

let testObject = { name: 'apples', category: 'fruit', description: 'A red sweat round shape thing',  price:2.99, inStock:100 };

describe('products Model', () => {
  it('can create() a new products', () => {
    return products.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          expect(record[key]).toEqual(testObject[key]);
        });
      });
  });

  it('can get() products', () => {
    return products.get()
      .then(foundObject => {
        Object.keys(testObject).forEach(key => {
          expect(foundObject[0][key]).toEqual(testObject[key]);
        });
      });
  });

});
