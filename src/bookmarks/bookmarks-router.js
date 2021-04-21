const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
// const { bookmarks } = require('../store');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
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

    bookmarks.push(bookmark);

    logger.info(`bookmark created with id: ${id}`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find((b) => b.id === id);

    if (!bookmark) {
      res.status(404).send('Cannot find that bookmark.');
    }

    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex((b) => b.id == id);

    if (bookmarkIndex === -1) {
      res.status(404).send('No bookmark deleted, cannot find it in the list.');
    }

    bookmarks.splice(bookmarkIndex, 1);

    res.status(204).end();
  });

module.exports = bookmarksRouter;
