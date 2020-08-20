'use strict';

require('@code-fellows/supergoose');

const categories = require(`../lib/models/categories/categories-model.js`);

let testObject = { name: 'fruit', description: 'Some vegi you can eat raw' };

describe('products Model', () => {
  it('can create() a new products', () => {
    return categories.create(testObject)
      .then(record => {
        Object.keys(testObject).forEach(key => {
          expect(record[key]).toEqual(testObject[key]);
        });
      });
  });

  it('can get() products', () => {
    return categories.get()
      .then(foundObject => {
        Object.keys(testObject).forEach(key => {
          expect(foundObject[0][key]).toEqual(testObject[key]);
        });
      });
  });

});
