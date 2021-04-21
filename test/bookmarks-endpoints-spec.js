const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixtures');

describe.only('Testing bookmarks endpoints...', function () {
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
  afterEach('clean the table (after each test)', () =>
    db('bookmarks').truncate()
  );

  after('disconnect from db', () => db.destroy());

  describe('GET /bookmarks', function () {
    context('Given there are no bookmarks:', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get('/bookmarks').expect(200, []); // not sure how this will work -- ask TJ if it doesn't
      });
    });

    context('Given there are bookmarks in the database:', () => {
      const testBookmarks = makeBookmarksArray();

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 200 and all of the articles', () => {
        return supertest(app).get('/bookmarks').expect(200, testBookmarks);
      });
    });
  });

  describe('GET /bookmarks/:id', function () {
    context('Given there are no bookmarks:', () => {});
    context('Given there are bookmarks in the database:', () => {});
  });
});
