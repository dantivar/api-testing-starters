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

  it('Should get detailed information of specific album', () => {
    const testId = '2367710a-d4fb-49f5-8860-557b337386dd';
    const expectedName = 'KIRK';
    const expectedCreatedAt = '2019-10-05T05:21:11Z';
    const expectedUpdatedAt = '2019-10-05T05:21:11Z';

    server
      .get('/v1/albums/' + testId)
      .expect(200)
      .end((err, res) => {
        expect(res.body.id).to.be.equal(testId);
        expect(res.body.name).to.be.equal(expectedName);
        expect(res.body.created_at).to.be.equal(expectedCreatedAt);
        expect(res.body.updated_at).to.be.equal(expectedUpdatedAt);
      });
  });

  it('Should create a new album', () => {
    const testAlbum = { 'name': 'Viento Sur'}
    let albumId = '';

    server
      .post('/v1/albums')
      .send(testAlbum)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        albumId = res.body.id;
        expect(res.body.name).to.be.equal(testAlbum.name);
      });
  });

  it('Should update the album', () => {
    const testId = '967d5bb5-3a7a-4d5e-8a6c-febc8c5b3f13';
    const updatedAlbum = {'name': 'not Hollywood\'s Bleeding'};

    server
      .put('/v1/albums/' + testId)
      .send(updatedAlbum)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body.name).to.be.equal(updatedAlbum.name);
      });
  });
});