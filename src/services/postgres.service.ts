import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pg = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export async function createUsersTable() {
  await pg.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      bio TEXT
    );
  `);
}

export async function insertUser(name: string, email: string, bio: string) {
  const result = await pg.query(
    `INSERT INTO users (name, email, bio) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, bio]
  );
  return result.rows[0];
}
