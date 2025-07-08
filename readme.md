
# Full Stack Application

This repository contains a full stack application with separate client and server components.

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or access to MongoDB Atlas)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (for containerized setup)

---

## Environment Variables Setup

Before starting the app, make sure to create the `.env` files as follows:
- ⚠️ **Important:**  
-- Use **no spaces** before or after the `=` sign.  
-- Wrap all values in **double quotes** (`"`), especially if they contain special characters.
### 🔹 `./client/.env`
```env
VITE_SERVER_URL=
```

- `VITE_SERVER_URL`: will be something like http://localhost:<PORT>.
- Here `PORT` is the same number that u will be entering in the server side .env file

### 🔹 `./server/.env`
```env
PORT=
MONGODBURL=
SECRET_KEY=
```

- `PORT`: The port number you want your server to run on (e.g., 5000).
- `MONGODBURL`: mongodb+srv://<username>:<password>@test.tv0wrvf.mongodb.net/SCR?retryWrites=true&w=majority&appName=TEST
- `SECRET_KEY`: Your JWT verification key.

---

## Option 1: Local Development Setup (without Docker)

### 1. Clone the repository
```bash
git clone https://github.com/Samyak-SH/Student-Repository-System.git
cd Student-Repository-System
```

### 2. Set up the Client
```bash
cd client
npm install
```

### 3. Set up the Server
```bash
cd ../server
npm install
```

### 4. Start the Application

#### Start the Server
```bash
cd server
npm start
```

#### Start the Client (in a new terminal)
```bash
cd client
npm run dev
```

---

## Option 2: Run with Docker Compose

Once your `.env` files are ready, you can use Docker Compose to build and run the app after cloning the repository as shown in Option 1 step 1:

### 1. Build and start the containers
```bash
docker-compose up --build
```

### 2. Access the application
- Client: [http://localhost:5173](http://localhost:5173)
- Server: [http://localhost:8080](http://localhost:8080)

> 📝 Make sure the ports in the `.env` and `docker-compose.yaml` match (5173 for frontend, 8080 for backend).

---

## Project Structure

```
project-root/
├── client/         # Frontend React application
│   ├── public/
│   ├── src/
│   └── .env        # Environment variables (you need to create this)
│
├── server/         # Backend Node.js/Express application
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── router/
│   └── .env        # Environment variables (you need to create this)
│
└── docker-compose.yaml
```

---

## Notes

- Make sure MongoDB is accessible via the URL you provide.
- The client and server can run simultaneously in local or containerized environments.
- If you run into issues with environment variables not being parsed in Docker, ensure you are **not using double quotes for strings containing special characters** like `$`.
