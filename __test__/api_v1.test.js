'use strict';

const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('products API', () => {
  it('can post() a new products', () => {
    let obj = { name: 'apples', category: 'fruit', description: 'A red sweat round shape thing',  price:2.99, inStock:100 };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a products', () => {
    let obj = { name: 'apples', category: 'fruit', description: 'A red sweat round shape thing',  price:2.99, inStock:100 };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/products`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body[1][key]).toEqual(obj[key]);
            });
          });
      });
  });

});
