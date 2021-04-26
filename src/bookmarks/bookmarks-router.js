const express = require('express');
const BookmarksService = require('../bookmarks-service');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
// const { bookmarks: storeBookmarks } = require('../store');
const store = require('../store');

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
  .post(bodyParser, (req, res) => {
    const { title, url, rating, description } = req.body;

    if (!title) {
      logger.error(`title is required`);
      return res.status(400).send('Invalid data');
    }
    if (!url) {
      logger.error(`url is required`);
      return res.status(400).send('Invalid data');
    }
    if (!rating) {
      logger.error(`rating is required`);
      return res.status(400).send('Invalid data');
    }
    if (!description) {
      logger.error(`description is required`);
      return res.status(400).send('Invalid data');
    }

    // get a new id
    const id = uuid();

    const bookmark = {
      id,
      title,
      url,
      rating,
      description,
    };

    store.bookmarks.push(bookmark); // <<<<<< CHANGE <<<<<<
    // const knexInstance = req.app.get('db');
    // BookmarksService.insertBookmark(db, bookmark); // not sure if this is correct, I attempted it before the checkpoint says to

    logger.info(`bookmark created with id: ${id}`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    // const bookmark = bookmarks.find((bkmrk) => bkmrk.id === id); // <<<<<< CHANGE <<<<<<
    BookmarksService.getBookmarkById(knexInstance, id)
      .then((bookmark) => {
        if (!bookmark) {
          logger.error(`Bookmark "${id}" not found.`);
          res.status(404).send(`Cannot find that bookmark.`);
        }
        res.json(bookmark);
      })
      .catch(next);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = store.bookmarks.findIndex((b) => b.id == id); // <<<<<< CHANGE <<<<<<

    if (bookmarkIndex === -1) {
      res.status(404).send('No bookmark deleted, cannot find it in the list.');
    }

    store.bookmarks.splice(bookmarkIndex, 1); // <<<<<< CHANGE <<<<<<

    res.status(204).end();
  });

module.exports = bookmarksRouter;
