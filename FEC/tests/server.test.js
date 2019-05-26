const app = require('../server/index.js');
const request = require('supertest');
const ticker = 'TSLA';
const port = 3004;

describe('App GET requests', () => {
    it('should successfully respond to a GET request', (done) => {
        request(app).get(`/api/stocks/${ticker}/prices`).then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
})

