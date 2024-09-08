import type{ FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByUsername } from '../model/user.model';
import { hashPassword, comparePasswords, generateToken } from '../services/authservice';
import { randomUUID } from 'crypto';

interface RegisterRequest extends FastifyRequest {
  body: {
    username: string;
    name: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends FastifyRequest {
  body: {
    username: string;
    password: string;
  };
}

export const registerUser = async (request: RegisterRequest, reply: FastifyReply) => {
  const { username, name, email, password } = request.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return reply.code(400).send({message: 'Username already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const user=await createUser(randomUUID(), name, email, username, hashedPassword);
    reply.code(201).send({ message: 'User created successfully' });
  } catch (error:unknown) {
    reply.code(500).send({ message:"Unknown occcured"});
  }
};

export const loginUser = async (request: LoginRequest, reply: FastifyReply) => {
  const { username, password } = request.body;
  try {
    const user = await findUserByUsername(username);
    if (!user || !(await comparePasswords(password, user.password))) {
      return reply.code(400).send({ error: 'Invalid username or password' });
    }
    const token = generateToken(user.id);
    reply.code(200).send({ token });
  } catch (error:unknown) {
    reply.code(500).send({ message:'Unknown error occured' });
  }
};
