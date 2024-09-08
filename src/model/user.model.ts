import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
}

export const createUser = async (id: string, name: string, email: string, username: string, password: string) => {
  await pool.query(
    `INSERT INTO users (id, name, email, userName, password) VALUES ($1, $2, $3, $4, $5)`,
    [id, name, email, username, password]
  );
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query(`SELECT * FROM users WHERE userName = $1`, [username]);
  return result.rows.length ? result.rows[0] : null;
};
export const findUserByUserId = async (userId: string): Promise<User | null> => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
  return result.rows.length ? result.rows[0] : null;
};
