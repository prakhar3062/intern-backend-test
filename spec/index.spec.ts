import { test } from "bun:test";
import './userRegistration.spec';
import './addBook.spec';



// This simulates a pool query that can return a predefined result
// mocks/mockPool.ts

export const mockPoolQuery = async (query: string, params: any[]) => {
  // Handling specific query patterns
  if (query.includes("SELECT") && query.includes("FROM books")) {
    // Simulate a SELECT query for books
    return Promise.resolve({
      rows: [{ id: 1, title: "Mock Book", author: "Mock Author", genre: "Fiction", publicationYear: 2024 }]
    });
  }

  if (query.includes("INSERT INTO books")) {
    // Simulate an INSERT query
    return Promise.resolve({
      rowCount: 1 // Simulates a successful insert
    });
  }

  if (query.includes("UPDATE books")) {
    // Simulate an UPDATE query
    return Promise.resolve({
      rowCount: 1 // Simulates a successful update
    });
  }

  if (query.includes("SELECT") && query.includes("FROM users")) {
    // Simulate a SELECT query for users
    return Promise.resolve({
      rows: [{ id: 1, username: "testuser", password: "hashed_password" }]
    });
  }

  if (query.includes("INSERT INTO users")) {
    // Simulate a successful user registration
    return Promise.resolve({
      rowCount: 1
    });
  }


  // Simulate an error for unknown queries
  return Promise.reject(new Error("Query not recognized"));
};


