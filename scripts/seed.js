require('dotenv').config(); // Charger les variables d'environnement

const { db } = require('@vercel/postgres');
const { users } = require('../app/lib/placeholder-data'); // Assurez-vous que ce chemin est correct
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  await client.sql`
    DROP TABLE IF EXISTS users;
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log(`Created "users" table`);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING;
      `;
    })
  );

  console.log(`Seeded ${insertedUsers.length} users`);
}

async function main() {
  try {
    const client = await db.connect();
    console.log('Connected to the database');

    await seedUsers(client);
    await client.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('An error occurred while attempting to seed the database:', error);
  }
}

main().catch((err) => {
  console.error('An unexpected error occurred:', err);
});
