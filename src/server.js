const app = require('./app'); // endpoints and middleware
const knex = require('knex');
const { PORT, DB_URL } = require('./config');

// create knex instance
const db = knex({
  client: 'pg',
  connection: DB_URL,
});

// set app.db to db (the knex instance)
app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
