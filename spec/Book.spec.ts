import { test, expect } from "bun:test";
import { addBook, getUserBooks } from "../src/controller/book.controller";
import { mockPoolQuery } from "./index.spec";
import { verifyToken } from "../src/services/authservice";

// Mock verifyToken function
export const mockVerifyToken = (token: string) => (token === "mock_token" ? "user123" : null);

// Add Book Test
test("adds a new book successfully", async () => {
  const mockRequest = {
    body: {
      token: "mock_token",
      title: "Book Title",
      author: "Book Author",
      genre: "Fiction",
      publicationYear: 2022,
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  // Mock the pool query as needed by addBook
  mockPoolQuery('INSERT INTO books (title, author, genre, publicationYear) VALUES ($1, $2, $3, $4)', 
                 ['Book Title', 'Book Author', 'Fiction', 2022]);
  
  await addBook(mockRequest as any, mockReply as any);
  
  expect(mockReply.code(201).send({ message: 'User created successfully' }));
});

test("fails to add book with invalid token", async () => {
  const mockRequest = {
    body: {
      token: "invalid_token",
      title: "Book Title",
      author: "Book Author",
      genre: "Fiction",
      publicationYear: 2022,
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  // Ensure verifyToken behavior is correctly mocked
  mockVerifyToken('invalid_token');

   await addBook(mockRequest as any, mockReply as any);

  expect(mockReply.code(401).send({ message: 'User is not authorized' }));
});

test("fetches user books successfully", async () => {
  const mockRequest = {
    params: {
      userId: "user123",
    },
    headers: {
      authorization: "Bearer mock_token",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  const mockBooks = [
    { id: "book1", title: "Book 1", author: "Author 1", genre: "Fiction", publicationYear: 2021 },
    { id: "book2", title: "Book 2", author: "Author 2", genre: "Non-fiction", publicationYear: 2022 },
  ];

  // Mock the pool query as needed by getUserBooks
  mockPoolQuery('SELECT * FROM books WHERE userId = $1', ['user123']);

   await getUserBooks(mockRequest as any, mockReply as any);

  expect(mockReply.code(200).send({ data: mockBooks, message: "fetched the data successfully" }));
});

test("fails to fetch books with invalid token", async () => {
  const mockRequest = {
    params: {
      userId: "user123",
    },
    headers: {
      authorization: "Bearer invalid_token",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  // Ensure verifyToken behavior is correctly mocked
  mockVerifyToken('invalid_token');

  const result = await getUserBooks(mockRequest as any, mockReply as any);

  expect(mockReply.code(401).send({ message: 'Invalid or missing token' }));
});

test("handles no books found for user", async () => {
  const mockRequest = {
    params: {
      userId: "user123",
    },
    headers: {
      authorization: "Bearer mock_token",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  // Mock the pool query as needed by getUserBooks
  mockPoolQuery('SELECT * FROM books WHERE userId = $1', ['user123']);

  const result = await getUserBooks(mockRequest as any, mockReply as any);

  expect(mockReply.code(404).send({ message: 'No books found' }));
});
