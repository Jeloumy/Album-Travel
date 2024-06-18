"use server";

import { sql } from '@vercel/postgres';
import { Users, Countries, Sprints,Precisions } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser(email: string): Promise<Users> {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as Users;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchCountries() {
  noStore();
  try {
    const data = await sql`
      SELECT countries.id_country, countries.name, countries.population, countries.subregion, countries.region, countries.area
      FROM countries`;
    return data.rows as Countries[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch countries.');
  }
}

export async function fetchCountry(name: string) {
  noStore();
  try {
    const data = await sql`
      SELECT countries.name, countries.population, countries.subregion, countries.region, countries.area
      FROM countries WHERE countries.name=${name}`;
    return data.rows as Countries[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch countries.');
  }
}

export async function fetchSprintScore() {
  noStore();
  try {
    const data = await sql`
      SELECT s.*, u.username
      FROM sprints s
      JOIN users u ON s.id_user = u.id_user
      ORDER BY s.nb_secret_find ASC, s.nb_penalities ASC;
    `;
    console.log(data);
    return data.rows as Sprints[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sprints.');
  }
}

export async function fetchPrecisionScore() {
  noStore();
  try {
    const data = await sql`
    SELECT p.*, u.username
    FROM precisions p
    JOIN users u ON p.id_user = u.id_user
    ORDER BY nb_click DESC, duration_of_game ASC`;
    return data.rows as Precisions[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch precisions.');
  }
}

export async function insertSprintScore(sprintScore: number, nb_penalities: number, id_user: any) {
  const date = new Date().toISOString();
  console.log(date);
  try {
    console.log('insertSprintScore 1');
    const data = await sql`
    INSERT INTO sprints (score_date, nb_secret_find, nb_penalities, id_user) VALUES (${date},${sprintScore},${nb_penalities},${id_user})`;
    console.log('insertSprintScore 2');
    return data.rows as Sprints[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert score in sprints.');
  }
}

export async function insertPrecisionScore(duration_of_game: number, nb_click: number, id_user: any, id_country: any) {
  noStore();
  const date = new Date().toISOString();
  console.log('Inserting precision score with params:', {
    date,
    duration_of_game,
    nb_click,
    id_user,
    id_country,
  });
  try {
    const data = await sql`
      INSERT INTO precisions (score_date, duration_of_game, nb_click, id_user, id_country) 
      VALUES (${date}, ${duration_of_game}, ${nb_click}, ${id_user}, ${id_country})
    `;
    return data.rows as Precisions[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert score in precisions.');
  }
}

