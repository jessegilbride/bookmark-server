module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL:
    process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
  TEST_DB_URL:
    process.env.TEST_DB_URL ||
    'postgresql://dunder_mifflin@localhost/bookmarks-test',
  API_TOKEN: process.env.API_TOKEN,
};
