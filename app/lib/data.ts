// lib/data.ts
'use server';

import { sql } from '@vercel/postgres';
import { User, Countries } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser(email: string): Promise<User> {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchCountries(): Promise<Countries[]> {
  noStore();
  try {
    const data = await sql`
      SELECT countries.name, countries.population, countries.subregion, countries.region, countries.area
      FROM countries`;
    if (data && data.rows) {
      return data.rows as Countries[];
    } else {
      console.error('No data returned from SQL query');
      return [];
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch countries.');
  }
}
