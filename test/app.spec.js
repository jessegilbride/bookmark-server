const app = require('../src/app');

describe('App', () => {
  it('GET / responds with a status:200', (done) => {
    supertest(app).get('/').expect(200);
    done();
    return;
  });
});
