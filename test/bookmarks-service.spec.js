const BookmarksService = require('../src/bookmarks-service');
const { makeTestBookmarks } = require('./bookmarks.fixtures');

describe('Tests for BookmarksService object: database CRUD operations', function () {
  /* const testBookmarks = makeTestBookmarks();

  before(() => db('bookmarks').truncate());
  afterEach(() => db('bookmarks').truncate());

  // disconnect from the database at the end of all the tests
  after(() => db.destroy());

  // TABLE HAS DATA
  context(`Given that 'bookmarks' table has data`, () => {
    beforeEach(() => {
      return db.into('bookmarks').insert(testBookmarks);
    });

    it('getAllBookmarks() resolves all bookmarks from the table', () => {});
    it('getBookmarkById() resolves a bookmark from the table by its id', () => {});
    it('insertBookmark() inserts a new bookmark', () => {});
    it('updateBookmark() updates a bookmark', () => {});
    it('deleteBookmark() deletes a bookmark', () => {});
  });

  // TABLE HAS NO DATA
  context(`Given that 'bookmarks' table has no data`, () => {
    it('getAllBookmarks() resolves an empty array', () => {});
    it('insertBookmark() inserts a new bookmark and resolves the new bookmark with an id', () => {});
  }); */
});
