const app = require('../src/app'); // the module to test
const { v4: uuid } = require('uuid'); // for bookmarkId variable in test to delete a bookmark when no bookmarks exist
const { makeTestBookmarks } = require('./bookmarks.fixtures');

describe('Testing bookmarks endpoints...', function () {
  before('make knex instance', () => {
    app.set('db', db); // necessary
  });

  before('clean the table (before all tests)', () =>
    db('bookmarks').truncate()
  );
  afterEach('clean the table (after each test)', () =>
    db('bookmarks').truncate()
  );

  after('disconnect from db', () => db.destroy());

  describe('GET /bookmarks', function () {
    context('Given there are *NO* bookmarks:', () => {
      it(`responds with 200 and an empty list`, (done) => {
        supertest(app).get('/bookmarks').expect(200, []);
        done();
        return;
      });
    });

    context('Given there are bookmarks in the database:', () => {
      const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 200 and all of the bookmarks', (done) => {
        supertest(app).get('/bookmarks').expect(200, testBookmarks);
        done();
        return;
      });
    });
  });

  describe(`POST /bookmarks`, () => {
    it(`creates an bookmark, responding with 201 and the new bookmark`, function () {
      const newBookmark = {
        title: 'New Test Bookmark',
        url: 'https://www.thisIsA.test',
        rating: '4',
        description: 'New bookmark description'
      };
      return supertest(app)
        .post('/bookmarks')
        .send(newBookmark)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).to.eql(newBookmark.title);
          expect(res.body.url).to.eql(newBookmark.url);
          expect(res.body.rating).to.eql(newBookmark.rating);
          expect(res.body.description).to.eql(newBookmark.description);
          expect(res.body).to.have.property('id');
          expect(res.headers.location).to.eql(`/bookmarks/${res.body.id}`);
        })
        .then((postRes) =>
          supertest(app)
            .get(`/bookmarks/${postRes.body.id}`)
            .expect(postRes.body)
        );
    });

    const requiredFields = ['title', 'url', 'rating', 'description'];

    requiredFields.forEach((field) => {
      const newBookmark = {
        title: 'New Test Bookmark',
        url: 'https://www.thisIsA.test',
        rating: '4',
        description: 'New bookmark description'
      };

      it(`responds with 400 and error message when the '${field}' is missing`, () => {
        delete newBookmark[field];

        return supertest(app)
          .post('/bookmarks')
          .send(newBookmark)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          });
      });
    });
  });

  describe('GET /bookmarks/:id', function () {
    context('Given there are *NO* bookmarks in the database:', () => {});

    context('Given there are bookmarks in the database:', () => {
      const testBookmarks = makeTestBookmarks(); // pulling this out, put into global scope of file to be shared between tests and to be exported to bookmarks-router (for endpoint testing)

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

  describe(`DELETE /bookmarks/:id`, () => {
    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeTestBookmarks();

      beforeEach('insert bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });

      it('responds with 204 and removes the bookmark', () => {
        const idToRemove = testBookmarks[0].id;
        const expectedBookmarks = testBookmarks.filter(
          (bookmark) => bookmark.id !== idToRemove
        );
        return supertest(app)
          .delete(`/bookmarks/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get(`/bookmarks`).expect(expectedBookmarks)
          );
      });
    });

    context(`Given there are *NO* bookmarks in the database`, () => {
      it(`responds with 404`, () => {
        const bookmarkId = uuid(); // expected to be type: UUID
        return supertest(app)
          .delete(`/bookmarks/${bookmarkId}`)
          .expect(404, { error: { message: `Bookmark doesn't exist` } });
      });
    });
  });
});
