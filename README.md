# Employee Management

This project is a web application for managing employee with user authentication. It consists of a frontend built with React and a backend created using Node.js, Express.js, and MongoDB. Users can register, log in, and get employee details in tabular manner, while authenticated users can manage the private route.

## Features

- User authentication (registration, login) using JWT tokens
- CRUD operations for Employee details
- Backend API with Node.js and Express.js
- MongoDB integration for data storage

## Installation and Setup

### Frontend Setup

1. Clone the frontend repository:

   ```bash
   git clone <frontend-repo-link>
   <br/>
   cd client-directory
   <br/>
   npm install
   <br/>
   npm start

1.Access the frontend application by opening it in a web browser.
### Backend Setup
Clone the backend repository:
git clone <git clone https://employee-table-backend.onrender.com>
cd server-directory
npm install

2.Configure environment variables:

Create a .env file and set up required environment variables (e.g., MongoDB URI, JWT secret)
Start the server:
npm start

### Usage

1.Register a new account or log in if already registered.
2.Provide Employee details.
3.View, update, or delete feedback based on authentication.

### Backend API Endpoints

•/user/register: POST request to register a new user
•/user/login: POST request to log in and obtain an authentication token
•/api: GET, POST, PUT, DELETE requests for managing employee (requires authentication)

Contributor Name : Kriti

Repository Links
Frontend link : https://65d47ad6cfee53b5a9a32b3f--peaceful-vacherin-379a63.netlify.app/login
<br/>
Backend link : https://employee-table-backend.onrender.com
