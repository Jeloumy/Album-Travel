// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

const getUserByEmail = async (email: string) => {
  const { rows } = await sql`SELECT name_user, email FROM Users WHERE email = ${email}`;
  return rows[0];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ name: user.name_user, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
