import { test, expect } from "bun:test";
import { registerUser, loginUser } from "../src/controller/user.controller";
import { mockPoolQuery } from "./index.spec";
import { hashPassword, comparePasswords, generateToken } from "../src/services/authservice";

// Mock auth service functions
export const mockHashPassword = async (password: string) => 'mock_hashed_password';
export const mockComparePasswords = async (input: string, hashed: string) => input === hashed;
export const mockGenerateToken = (userId: string) => 'mock_token';

// Register User Test
test("registers a new user successfully", async () => {
  const mockRequest = {
    body: {
      username: "testuser",
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  mockPoolQuery('SELECT * FROM users WHERE username = $1', ['testuser']); // No existing user

   await registerUser(mockRequest as any, mockReply as any);

  expect(mockReply.code(201).send({ message: 'User created successfully' }));
});

test("registers a user with an existing username", async () => {
  const mockRequest = {
    body: {
      username: "existinguser",
      name: "Existing User",
      email: "existing@example.com",
      password: "password123",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  mockPoolQuery('SELECT * FROM users WHERE username = $1', ['existinguser']); // User already exists

  const result = await registerUser(mockRequest as any, mockReply as any);

  expect(mockReply.code(400).send({ message: 'Username already exists' }));
});

test("logs in a user successfully", async () => {
  const mockRequest = {
    body: {
      username: "testuser",
      password: "password123",
    },
  };

  const mockReply = {
    code:(code:number)=>({send: (message: any) => message}),
  };

  mockPoolQuery('SELECT id, password FROM users WHERE username = $1', ['testuser']);
  
  const result = await loginUser(mockRequest as any, mockReply as any);

  expect(mockReply.code(200).send({ token: "mock_token" }));
});

test("fails to log in with incorrect password", async () => {
  const mockRequest = {
    body: {
      username: "testuser",
      password: "wrongpassword",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  mockPoolQuery('SELECT id, password FROM users WHERE username = $1', ['testuser']);

  const result = await loginUser(mockRequest as any, mockReply as any);

  expect(mockReply.code(400).send({ message: 'Invalid username or password' }));
});

test("fails to log in if user does not exist", async () => {
  const mockRequest = {
    body: {
      username: "nonexistentuser",
      password: "password123",
    },
  };

  const mockReply = {
    code: (code: number) => ({ send: (message: any) => message }),
  };

  mockPoolQuery('SELECT id, password FROM users WHERE username = $1', ['nonexistentuser']); // No user found

  const result = await loginUser(mockRequest as any, mockReply as any);

  expect(mockReply.code(400).send({ message: 'Invalid username or password' }));
});
