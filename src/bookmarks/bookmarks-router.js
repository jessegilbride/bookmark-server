const express = require('express');
const xss = require('xss');
const BookmarksService = require('../bookmarks-service');
const { v4: uuid } = require('uuid');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db'); // gets app.db, which is the knex instance created in server.js
    BookmarksService.getAllBookmarks(knexInstance)
      .then((bookmarks) => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { title, url, rating, description } = req.body;
    const id = uuid();
    const newBookmark = { id, title, url, rating, description };

    for (const [key, value] of Object.entries(newBookmark)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
      }
    }

    const knexInstance = req.app.get('db');
    BookmarksService.insertBookmark(knexInstance, newBookmark)
      .then((bookmark) => {
        res.status(201).location(`/bookmarks/${bookmark.id}`).json(bookmark);
      })
      .catch(next);
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .all((req, res, next) => {
    BookmarksService.getBookmarkById(req.app.get('db'), req.params.id)
      .then((bookmark) => {
        if (!bookmark) {
          return res.status(404).json({
            error: { message: `Bookmark doesn't exist` }
          });
        }
        res.bookmark = bookmark; // save the bookmark for the next middleware
        next(); // call next() so the next middleware happens
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json({
      id: res.bookmark.id,
      title: xss(res.bookmark.title), // sanitize title
      url: xss(res.bookmark.url), // sanitize url
      rating: res.bookmark.rating,
      description: xss(res.bookmark.description) // sanitize description
    });
  })
  .delete((req, res, next) => {
    BookmarksService.deleteBookmark(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = bookmarksRouter;
