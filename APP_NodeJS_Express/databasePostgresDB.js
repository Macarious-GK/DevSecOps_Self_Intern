require('dotenv').config(); // Load environment variables from .env

const {Client} = require('pg');

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

client.connect();

client.query('SELECT * from public.cars', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to PostgreSQL database:', res.rows[0]);
  }
})

