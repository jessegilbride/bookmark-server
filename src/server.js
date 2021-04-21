const app = require('./app'); // exposes server to endpoints and middleware via express
const knex = require('knex'); // exposes server to database
const { PORT } = require('./config');

// create knex instance
const db = knex({
  client: 'pg',
  connection: DB_URL,
});

app.set('db', db); // attach knex to app; avoids circular referencing between app and server files

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
