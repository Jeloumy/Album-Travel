require('dotenv').config(); // Charger les variables d'environnement

const { db } = require('@vercel/postgres');
const { users } = require('../app/lib/placeholder-data'); // Assurez-vous que ce chemin est correct
const bcrypt = require('bcrypt');

async function seedDatabase(client) {
  // Créer les tables
  await client.sql`
    DROP TABLE IF EXISTS Score;
    DROP TABLE IF EXISTS Country;
    DROP TABLE IF EXISTS Langues;
    DROP TABLE IF EXISTS continents;
    DROP TABLE IF EXISTS Users;
    
    CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      name_user VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE Langues (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );

    CREATE TABLE continents (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );

    CREATE TABLE Country (
      id SERIAL PRIMARY KEY,
      name_country VARCHAR(50) NOT NULL,
      superficie DECIMAL(15,2) NOT NULL,
      nb_citizens INT NOT NULL,
      id_1 INT NOT NULL,
      id_2 INT NOT NULL,
      FOREIGN KEY(id_1) REFERENCES continents(id),
      FOREIGN KEY(id_2) REFERENCES Langues(id)
    );

    CREATE TABLE Score (
      date_game TIMESTAMPTZ,
      nb_tentative INT NOT NULL,
      duration DECIMAL(15,2),
      id INT NOT NULL,
      id_1 INT NOT NULL,
      PRIMARY KEY(date_game),
      FOREIGN KEY(id) REFERENCES Country(id),
      FOREIGN KEY(id_1) REFERENCES Users(id)
    );
  `;

  console.log(`Created tables`);

  // Insérer des utilisateurs de test
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      console.log('Inserting user:', user); // Ajoutez ce log pour vérifier les données
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO Users (name_user, email, password)
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

    await seedDatabase(client);
    await client.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('An error occurred while attempting to seed the database:', error);
  }
}

main().catch((err) => {
  console.error('An unexpected error occurred:', err);
});
