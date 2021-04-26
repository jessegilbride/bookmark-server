const app = require('../src/app'); // the module to test
const makeTestBookmarks = require('./bookmarks.fixtures');

const testBookmarks = makeTestBookmarks();

describe('Testing bookmarks endpoints...', function () {
  before('make knex instance', () => {
    app.set('db', db); // necessary?
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
      it.only(`responds with 200 and an empty list`, (done) => {
        supertest(app).get('/bookmarks').expect(200, []);
        done();
        return;
      });
    });

    context('Given there are bookmarks in the database:', () => {
      // const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 200 and all of the bookmarks', (done) => {
        supertest(app).get('/bookmarks').expect(200, testBookmarks);
        done();
        return;
      });

      /* sanity test */
      // it('should not fail', function (done) {
      //   try {
      //     supertest(app).get('/bookmarks').expect(200, testBookmarks);
      //     done();
      //   } catch (error) {
      //     done(error);
      //   }
      // });
    });
  });

  describe('GET /bookmarks/:id', function () {
    context('Given there are no bookmarks:', () => {});

    context('Given there are bookmarks in the database:', () => {
      // const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 200 and the specified bookmark', (done) => {
        const indexOfBookmark = 0;
        const expectedBookmark = testBookmarks[indexOfBookmark];
        const expectedBookmarkId = expectedBookmark.id;
        // console.log(expectedBookmark);
        // console.log(expectedBookmarkId);
        supertest(app)
          .get(`/bookmarks/:${expectedBookmarkId}`)
          .expect(200, expectedBookmark);
        done();
        return;
      });
    });
  });
});

module.exports = {
  testBookmarks,
};
