require('dotenv').config(); // Charger les variables d'environnement

const { db } = require('@vercel/postgres');
const fetch = require('node-fetch');

async function dropTables(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS precisions CASCADE`;
    await client.sql`DROP TABLE IF EXISTS sprints CASCADE`;
    await client.sql`DROP TABLE IF EXISTS countries CASCADE`;
    await client.sql`DROP TABLE IF EXISTS users CASCADE`;
    await client.sql`DROP TABLE IF EXISTS country CASCADE`;
    await client.sql`DROP TABLE IF EXISTS langues CASCADE`;
    await client.sql`DROP TABLE IF EXISTS continents CASCADE`;
    await client.sql`DROP TABLE IF EXISTS score CASCADE`;
    console.log('Dropped existing tables');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function createUsersTable(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id_user UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    console.log('Created "users" table');
  } catch (error) {
    console.error('Error creating "users" table:', error);
    throw error;
  }
}

async function createSprintsTable(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS sprints (
        id_sprint UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        score_date TIMESTAMP NOT NULL,
        nb_secret_find INT NOT NULL,
        nb_penalities INT NOT NULL,
        id_user UUID NOT NULL,
        FOREIGN KEY(id_user) REFERENCES users(id_user)
      );
    `;
    console.log('Created "sprints" table');
  } catch (error) {
    console.error('Error creating "sprints" table:', error);
    throw error;
  }
}

async function createCountriesTable(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS countries (
        id_country UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        area FLOAT NOT NULL,
        population INT NOT NULL,
        region VARCHAR(50) NOT NULL,
        subregion VARCHAR(50) NOT NULL,
        flag_link VARCHAR(255) NOT NULL
      );
    `;
    console.log('Created "countries" table');
  } catch (error) {
    console.error('Error creating "countries" table:', error);
    throw error;
  }
}

async function createPrecisionsTable(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS precisions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        score_date TIMESTAMP NOT NULL,
        duration_of_game INT NOT NULL,
        nb_click INT NOT NULL,
        id_country UUID NOT NULL,
        id_user UUID NOT NULL,
        FOREIGN KEY(id_country) REFERENCES countries(id_country) ON DELETE CASCADE,
        FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
      );
    `;
    console.log('Created "precisions" table');
  } catch (error) {
    console.error('Error creating "precisions" table:', error);
    throw error;
  }
}

async function seedCountries(client) {
  try {
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      console.error('API key is not defined');
      throw new Error('API key is not defined');
    }

    console.log('Using API key:', process.env.NEXT_PUBLIC_API_KEY);

    // Récupère tous les pays depuis l'API
    const response = await fetch(`https://countryapi.io/api/all?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await response.json();

    console.log('API response:', JSON.stringify(data, null, 2));

    const countries = Object.values(data);

    if (!Array.isArray(countries) || countries.length === 0) {
      console.error('Expected an array of countries, got:', countries);
      throw new TypeError('Expected an array of countries');
    }

    // Insère les pays dans la base de données
    const insertedCountries = await Promise.all(
      countries.map((country) =>
        client.sql`
          INSERT INTO countries (name, area, population, region, subregion,flag_link)
          VALUES (
            ${country.name}, 
            ${parseFloat(country.area)}, 
            ${country.population}, 
            ${country.region}, 
            ${country.subregion},
            ${country.flag.large}
          )
          ON CONFLICT (name) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedCountries.length} countries`);
    return { insertedCountries };
  } catch (error) {
    console.error('Error seeding countries:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await dropTables(client); // Drop existing tables
    await createUsersTable(client); // Create users table
    await createSprintsTable(client); // Create sprints table
    await createCountriesTable(client); // Create countries table
    await createPrecisionsTable(client); // Create precisions table
    await seedCountries(client); // Seed the countries table
  } catch (err) {
    console.error('An error occurred during seeding:', err);
  } finally {
    await client.end();
  }
}


async function seedPrecision(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS precisions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        score_date TIMESTAMP NOT NULL,
        duration_of_game INT NOT NULL,
        nb_click INT NOT NULL,
        id_country UUID NOT NULL,
        id_user UUID NOT NULL,
        FOREIGN KEY(id_country) REFERENCES countries(id_country) ON DELETE CASCADE,
        FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
      );
    `;

    console.log('Created "precisions" table');
    return { createTable };
  } catch (error) {
    console.error('Error seeding precisions:', error);
    throw error;
  }
}


main().catch((err) => {
  console.error('An unexpected error occurred:', err);
});