const { db } = require('@vercel/postgres');
const {users} = require('../src/app/lib/placeholder-data');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50) PRIMARY KEY,
      nom VARCHAR(50),
      email VARCHAR(50) UNIQUE,
      password TEXT NOT NULL,
      date_inscription TIMESTAMP
    );
 `;

  console.log(`Created "users" table`);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, nom, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});