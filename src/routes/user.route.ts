import type{ FastifyInstance, RouteHandlerMethod } from 'fastify';
import { registerUser, loginUser } from '../controller/user.controller';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerUser as RouteHandlerMethod);
  fastify.post('/login', loginUser as RouteHandlerMethod);
}
