"use server";

import { sql } from '@vercel/postgres';
import { Users, Countries } from './definitions';
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
      SELECT countries.name, countries.population, countries.subregion, countries.region, countries.area
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