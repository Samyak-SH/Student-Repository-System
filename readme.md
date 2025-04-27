# Full Stack Application

This repository contains a full stack application with separate client and server components.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or access to MongoDB Atlas)

## Setup Instructions

### 1. Set up the Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### 2. Set up the Server

1. Move back to the root directory (if you're in the client directory):
   ```bash
   cd ..
   ```

2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install the server dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file inside the `./server` folder with the following environment variables:
   ```
   PORT= 
   MONGODBURL= 
   SECRET KEY = 
   ```
   * `PORT`: The port number you want your server to run on (e.g., 5000).
   * `MONGODBURL`: mongodb+srv://`<username>`:`<password>`@test.tv0wrvf.mongodb.net/SCR?retryWrites=true&w=majority&appName=TEST
   * `SECRETKEY`: Your JWT verification key.

### 3. Start the Application

#### Start the Server
Inside the `server` directory, run:
```bash
npm start
```

#### Start the Client
In a new terminal window, navigate to the client directory and run:
```bash
cd client
npm start
```

## Project Structure

```
project-root/
├── client/         # Frontend React application
│   ├── public/
│   ├── src/
│   └── package.json
│
└── server/         # Backend Node.js/Express application
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── router/
    ├── .env        # Environment variables (you need to create this)
    └── package.json
```

## Notes

* Make sure MongoDB is running locally or the `MONGODBURL` is properly set if using a cloud database (e.g., MongoDB Atlas).
* Ensure that the client and server are running in their respective environments if you plan to run both simultaneously.
* The client typically runs on port 3000 by default, while the server runs on the port specified in your `.env` file.