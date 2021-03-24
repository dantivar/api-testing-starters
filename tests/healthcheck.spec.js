const expect = require('chai').expect;
const request = require('supertest');

describe('Healthcheck endpoint', () => {
  it('Should return "OK" text', () => {
    request('http://localhost:8080')
      .get('/healthcheck')
      .end((err, res) => {
        expect(res.text).contains("OK");
      });
  });
});
