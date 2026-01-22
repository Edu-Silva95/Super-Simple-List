# MongoDB Setup Instructions

## Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas account (free cloud option)

## Option 1: Local MongoDB

```bash
# Install MongoDB locally (Windows/Mac/Linux)
# https://docs.mongodb.com/manual/installation/

# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify connection:
mongosh "mongodb://localhost:27017"
```

## Option 2: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (M0 tier is free)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/super-simple-list?retryWrites=true&w=majority`)

## Setup Backend

```bash
cd server
npm install
```

## Create .env file in server folder

```bash
# server/.env
MONGODB_URI=mongodb://localhost:27017/super-simple-list
PORT=5000

# Or if using MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/super-simple-list?retryWrites=true&w=majority
```

## Run Backend Server

```bash
cd server
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

The server will be available at: `http://localhost:5000`

## API Endpoints

- **GET** `/api/items` - Get all items
- **POST** `/api/items` - Add new item (body: `{name, quantity, category}`)
- **DELETE** `/api/items/:id` - Delete item by ID
- **DELETE** `/api/items` - Delete all items
- **GET** `/api/health` - Check server status

## Next Steps

1. Install and run MongoDB locally or set up MongoDB Atlas
2. Create `.env` file with your MongoDB URI
3. Run `npm install` in the server folder
4. Run `npm run dev` to start the backend
5. Your frontend will connect to `http://localhost:5000/api/items`
