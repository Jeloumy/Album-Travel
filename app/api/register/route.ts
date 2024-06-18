import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Parsing the request body
    const { username, email, password } = await request.json();

    // Check for missing fields
    if (!username || !email || !password) {
      console.error('Missing fields:', { username, email, password });
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Hashing the password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

    // Connecting to the database
    console.log('Connecting to the database...');
    const client = await db.connect();
    console.log('Connected to the database.');

    // Inserting user into the database
    console.log('Inserting user into the database...');
    await client.sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;
    console.log('User inserted successfully.');

    // Return success response
    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle the error and ensure it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Error creating user', details: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
