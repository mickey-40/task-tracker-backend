# Task Tracker App - Backend

This is the backend API for the Task Tracker App.  
It is built with **Node.js**, **Express.js**, **MongoDB (Atlas)**, and **JWT authentication**.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Full CRUD (Create, Read, Update, Delete) for tasks
- Tasks are user-specific (only the owner can see and modify their tasks)
- Protected routes using authentication middleware
- RESTful API structure
- Deployed on Render

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- CORS

## Getting Started Locally

1. Clone the repository:

```bash
git clone https://github.com/mickey-40/task-tracker-backend.git
cd task-tracker-backend
