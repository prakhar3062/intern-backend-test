import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export const createBook = async (id: string, title: string, author: string, genre: string, publicationYear: number) => {
  await pool.query(
    `INSERT INTO books (id, title, author, genre, publicationYear) VALUES ($1, $2, $3, $4, $5)`,
    [id, title, author, genre, publicationYear]
  );
};

export const findUserBooks = async (userId: string, bookId?: string): Promise<Book[]> => {
  let query = `
    SELECT b.* 
    FROM books b
    JOIN user_books ub 
    ON b.id = ub.book_id
    WHERE ub.user_id = $1`;

  const queryParams: (string | undefined)[] = [userId];

  // Check if bookId is provided, if so, add it to the query
  if (bookId) {
    query += ` AND ub.book_id = $2`;
    queryParams.push(bookId);
  }

  const result = await pool.query(query, queryParams);
  return result.rows;
};

