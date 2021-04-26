const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');

const { TEST_DB_URL } = require('../src/config');

db = knex({
  client: 'pg',
  connection: TEST_DB_URL,
});

global.db = db;

global.expect = expect;
global.supertest = supertest;
