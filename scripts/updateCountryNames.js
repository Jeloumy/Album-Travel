require('dotenv').config(); // Charger les variables d'environnement

const { db } = require('@vercel/postgres');

async function updateCountryNames(client) {
  try {
    const updateQueries = [
      client.sql`UPDATE countries SET name = 'Swaziland' WHERE name = 'Eswatini'`,
      client.sql`UPDATE countries SET name = 'United States of America' WHERE name = 'United States'`,
      client.sql`UPDATE countries SET name = 'Czech Republic' WHERE name = 'Czechia'`,
      client.sql`UPDATE countries SET name = 'Macedonia' WHERE name = 'North Macedonia'`,
      client.sql`UPDATE countries SET name = 'Democratic Republic of the Congo' WHERE name = 'DR Congo'`,
      client.sql`UPDATE countries SET name = 'The Bahamas' WHERE name = 'Bahamas'`,
      client.sql`UPDATE countries SET name = 'United Republic of Tanzania' WHERE name = 'Tanzania'`,
      client.sql`UPDATE countries SET name = 'Guinea Bissau' WHERE name = 'Guinea-Bissau'`,
      client.sql`UPDATE countries SET name = 'East Timor' WHERE name = 'Timor-Leste'`,
      client.sql`UPDATE countries SET name = 'Republic of Serbia' WHERE name = 'Serbia'`,
    ];

    await Promise.all(updateQueries);

    console.log('Updated country names');
  } catch (error) {
    console.error('Error updating country names:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await updateCountryNames(client); // Mettre à jour les noms des pays
  } catch (err) {
    console.error('An error occurred during updating country names:', err);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('An unexpected error occurred:', err);
});
