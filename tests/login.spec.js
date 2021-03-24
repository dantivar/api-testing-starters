const request = require('supertest');
const expect = require('chai').expect;

describe('Login endpoint', () => {
  it('Should not login', () => {
    const wrongCredentials = { "username": "demosss", "password": "pass" };
    request('http://localhost:8080')
      .post('/v1/login')
      .send(wrongCredentials)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.status).to.be.equal(401);
        expect(res.body.message).to.be.equal("You are not authenticated to perform the requested action.");
      });
  });

  it('Should login', () => {
    const credentials = { "username": "demo", "password": "pass" };
    request('http://localhost:8080')
      .post('/v1/login')
      .send(credentials)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.token).to.exist;
      });
  });

  it.skip('Should remove spaces and special characters from credentials', async () => {
    const dirtyCredentials = { "username": "dem''o", "password": "p a s s" };
    await request('http://localhost:8080')
      .post('/v1/login')
      .send(dirtyCredentials)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body.token).to.exist;
      });
  });

  it.skip('Should validate json structure', async () => {
    const dirtyCredentials = { "username": "demo", "password": "pass", "additional_field": "addional_value"};
    await request('http://localhost:8080')
      .post('/v1/login')
      .send(dirtyCredentials)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body.token).not.to.exist;
      });
  });
});
