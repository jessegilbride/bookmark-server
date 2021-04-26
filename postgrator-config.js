const { DB_URL, TEST_DB_URL } = require('./src/config');

module.exports = {
  migrationsDirectory: 'migrations',
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_URL
      : process.env.DB_URL,
};
