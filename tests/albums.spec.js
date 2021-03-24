const server = require('supertest').agent('http://localhost:8080');
const expect = require('chai').expect;

describe('Albums endpoint', () => {
  const credentials = { "username": "demo", "password": "pass" };

  server
    .post('/v1/login')
    .send(credentials)
    .expect(200);

  it('Should get a list of the albums', () => {
    server
      .get('/v1/albums')
      .end((err, res) => {
        expect(res.body.items).to.be.an('array');
        expect(res.body.items[0]).to.have.property('name').that.is.a('string');
      });
  });
});