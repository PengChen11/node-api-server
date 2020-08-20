'use strict';

const { server } = require('../lib/server.js');
// const supertest = require('supertest');
// const mockRequest = supertest(server);
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('web server', () => {

  it.skip('should respond with a 500 on an error', () => {

    return mockRequest
      .get('/bad')
      .then(results => {
        expect(results.status).toBe(500);
      });

  });

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /api/v1/products', () => {

    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

});
