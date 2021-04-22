const { expect } = require('chai');
const knex = require('knex');
// const app = require('../src/app'); // the module to testt
// const app = require('../src/bookmarks/bookmarks-router'); // the module to test??
const { makeTestBookmarks } = require('./bookmarks.fixtures');

const testBookmarks = makeTestBookmarks();

describe('Testing bookmarks endpoints...', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  before('clean the table (before all tests)', () =>
    db('bookmarks').truncate()
  );
  // afterEach('clean the table (after each test)', () =>
  //   db('bookmarks').truncate()
  // );

  after('disconnect from db', () => db.destroy());

  describe('GET /bookmarks', function () {
    context('Given there are no bookmarks:', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get('/bookmarks').expect(200, []); // not sure how this will work -- ask TJ if it doesn't
      });
    });

    context('Given there are bookmarks in the database:', () => {
      // const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 200 and all of the bookmarks', () => {
        return supertest(app).get('/bookmarks').expect(200, testBookmarks);
      });
    });
  });

  describe('GET /bookmarks/:id', function () {
    context('Given there are no bookmarks:', () => {});

    context('Given there are bookmarks in the database:', () => {
      // const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it.only('responds with 200 and the specified bookmark', () => {
        const indexOfBookmark = 0;
        const expectedBookmark = testBookmarks[indexOfBookmark];
        const expectedBookmarkId = expectedBookmark.id;
        // console.log(expectedBookmark);
        // console.log(expectedBookmarkId);
        return supertest(app)
          .get(`/bookmarks/:${expectedBookmarkId}`)
          .expect(200, expectedBookmark);
      });
    });
  });
});

module.exports = {
  testBookmarks,
};
