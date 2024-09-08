import type{ FastifyReply, FastifyRequest } from 'fastify';
import { createBook, findUserBooks } from '../model/book.model';
import { randomUUID } from 'crypto';
import { verifyToken } from '../services/authservice';
import { findUserByUserId } from '../model/user.model';
interface BookRequest extends FastifyRequest {
  body: {
    token: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
  };
}

interface UserBooksRequest extends FastifyRequest {
    params: {
        userId: string;
        bookId?: string;
      };
      headers: {
        authorization?: string;
      };
}

export const addBook = async (request: BookRequest, reply: FastifyReply) => {
  const { token, title, author, genre, publicationYear } = request.body;
  try {
    const userId = verifyToken(token);
    if (!userId) {
      return reply.code(401).send({ 
      message: 'User is not authorized' });
    }
    const book=await createBook(randomUUID(), title, author, genre, publicationYear);
    reply.code(200).send({data:book, message: 'Book created successfully!' });
  } catch (error:unknown) {
    reply.code(500).send({message:'Something went wrong' });
  }
};

export const getUserBooks = async (request: UserBooksRequest, reply: FastifyReply) => {
    const { userId, bookId } = request.params;
    const token = request.headers.authorization?.split(' ')[1];
  
    try {
      if (!token || !verifyToken(token)) {
        return reply.code(401).send({ message: 'Invalid or missing token' });
      }
      
      // Fetch books for the user, optionally filter by bookId
      const books = await findUserBooks(userId, bookId);
      if (!books.length) {
        return reply.code(404).send({message: 'No books found' });
      }
      
      reply.status(200).send({data:books,message:'fetched the data sucessfully'});
    } catch (error:unknown) {
      reply.status(500).send({message:"Something unknown occured"});
    }
};
