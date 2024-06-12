const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://default:TWsN6Jb8lgHI@ep-steep-queen-a4rw1c9p-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });
