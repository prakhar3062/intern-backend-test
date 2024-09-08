# Project Overview

This project is organized to follow a clear separation of concerns using the **MVC (Model-View-Controller)** architecture pattern. The **src** directory contains the implementation of the API, while the **spec** directory is used for tests.

## Project Structure

- **src**: This directory contains the core logic for the backend API development.
  - **controllers**: Defines how the API routes interact with the services and models.
  - **services**: Contains the business logic, like authentication or any data processing.
  - **models**: Represents the database models.
  - **routes**: Defines the API routes and connects them to the corresponding controller actions.
  
- **spec**: This directory contains all the unit tests for the project, ensuring each part of the code functions as expected.
  - **spec/book.spec**: Contains tests for the api related to  the user table.
  - **spec/user.spec**: Contains tests for the api related to  the book table.
  
## Libraries Installed

1. **Bun**: A fast JavaScript runtime used for running the project and executing tests.
3. **Fastify**: A lightweight and fast web framework for building backend APIs.
4. **ts-node**: Allows running TypeScript directly in Node.js without the need for pre-compilation.
5. **pg (node-postgres)**: PostgreSQL client for Node.js, used to interact with a PostgreSQL database.
6. **dotenv**: Loads environment variables from a `.env` file to manage sensitive data like database credentials and ports.
7. **nodemon**: Automatically restarts the server when changes in the project files are detected.
9. **bun:test**: Bun's native testing framework used to run the unit tests.
10. **@types/node**: Provides type definitions for Node.js.
11. **@types/fastify**: Provides type definitions for Fastify.

## Project Changes

- **Project Structure**: The project was organized into the **MVC** structure with clear separation between controllers, services, and models.
- **Testing**: Bun's `bun:test` was used to write and execute unit tests. All tests are placed under the `spec` folder, following a structured approach.
- **Library Installation**: Necessary libraries, such as `pg` for database interaction and `Fastify` for API development, were installed and integrated into the project.

