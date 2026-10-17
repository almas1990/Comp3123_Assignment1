# COMP3123 Assignment 1 – Employee Management API

**Student ID:** 101568934

## Project Description

This project is a RESTful Employee Management API developed using Node.js, Express.js, and MongoDB.

It supports user registration, login, JWT authentication, and employee CRUD operations. Employee records are associated with the user who created them.

## Technologies Used

- Node.js
- Express.js
- MongoDB and Mongoose
- JSON Web Token (JWT)
- bcrypt
- Helmet
- Morgan
- Express Rate Limit
- Postman
- Docker

## Features

- User signup and login
- Secure password hashing using bcrypt
- JWT authentication
- Create, retrieve, update, and delete employees
- Employee ownership protection
- Input validation and error handling
- API rate limiting
- Security headers using Helmet
- Console and file-based request logging
- Health check endpoint

## Installation

1. Clone or download the repository.
2. Open the project in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file using the example below.
5. Start MongoDB.
6. Start the application:

```bash
npm start
```

The application runs at `http://localhost:3000` by default.

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27019/comp3123_assignment1
JWT_SECRET=replace_with_your_own_secure_secret
JWT_EXPIRES_IN=1h
```

The MongoDB URI assumes a local MongoDB instance exposed on port 27019.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a user |
| POST | `/api/v1/user/login` | Log in and receive JWT |
| GET | `/api/v1/protected` | Test JWT authorization |
| POST | `/api/v1/emp/employees` | Create employee |
| GET | `/api/v1/emp/employees` | Get employees |
| GET | `/api/v1/emp/employees/:id` | Get employee by ID |
| PUT | `/api/v1/emp/employees/:id` | Update employee |
| DELETE | `/api/v1/emp/employees/:id` | Delete employee |
| GET | `/health` | Check server status |

*The employee update and delete URL formats should be checked against the implemented routes before final submission.*

## Security

Passwords are hashed using bcrypt. JWT authentication protects employee endpoints, and employee ownership is enforced by the application.

Helmet provides HTTP security headers. Rate limiting is configured for API requests, and Morgan records HTTP requests in the console and `logs/access.log`.

## API Testing

Postman is used to test successful API operations and error responses, including:

- Successful signup and login
- JWT authentication
- Employee CRUD operations
- Employee ownership restrictions
- Invalid input handling
- Rate limiting (429 Too Many Requests)
- Health check (200 OK)

## Database

Database name: `comp3123_assignment1`

Collections:

- `users`
- `employees`

MongoDB runs locally using Docker with host port `27019` mapped to container port `27017`.