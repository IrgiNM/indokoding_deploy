import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email) return res.status(400).send('Email is required');

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
    await connection.execute('INSERT IGNORE INTO users (email) VALUES (?)', [email]);
    await connection.end();
    return res.status(200).send('User saved successfully');
  } catch (error) {
    console.error('DB Error:', error);
    return res.status(500).send('Failed to save user');
  }
}
