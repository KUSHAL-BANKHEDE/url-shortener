# Custom URL Shortener API

A scalable URL shortener API built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to create short URLs, track advanced analytics, and authenticate via Google Sign-In. The application is dockerized for easy deployment.

---

## Features

1. **User Authentication**:
   - Google Sign-In for user registration and login.
   - JWT-based authentication for secure API access.

2. **URL Shortening**:
   - Create short URLs from long URLs.
   - Optional custom aliases and topic-based grouping.

3. **Advanced Analytics**:
   - Track total clicks, unique users, and device/OS information.
   - Group analytics by topic or overall user performance.

4. **Rate Limiting**:
   - Restrict the number of short URLs a user can create within a specified time frame.

5. **Caching**:
   - Use Redis to cache short and long URLs for improved performance.

6. **Dockerized Deployment**:
   - Easily deploy the application using Docker and Docker Compose.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Redis (Caching)
  - Passport.js (Google OAuth)
  - Rate Limiter (Rate Limiting)

- **Frontend**:
  - React.js
  - Axios (API Calls)
  - React Router (Routing)

- **DevOps**:
  - Docker
  - Docker Compose

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB
- Redis
- Docker (optional, for containerized deployment)
- Google OAuth Credentials (Client ID and Secret)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Set Up Environment Variables
Create a .env file in the root directory with the following variables:

```bash
MONGO_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIS_URL=redis://localhost:6379
```

### 3. Install Dependencies
For the backend:
```bash
npm install
```

For the frontend:
```bash
cd client
npm install
```

### 4. Run the Application

Start MongoDB and Redis on your local machine.

Run the backend server:
```bash
npm start
```

Run For the frontend:
```bash
cd client
npm start
```

### Access the application at http://localhost:3000.
