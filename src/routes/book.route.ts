import type{ FastifyInstance, RouteHandlerMethod } from 'fastify';
import { addBook, getUserBooks } from '../controller/book.controller.js';

export default async function bookRoutes(fastify: FastifyInstance) {
  fastify.post('/books/add', addBook as RouteHandlerMethod);
  fastify.get('/books/:userId/books/:bookId', getUserBooks as RouteHandlerMethod);
}
