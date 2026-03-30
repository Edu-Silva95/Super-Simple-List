# Super Simple List

A simple full-stack CRUD application for managing items, built with React (TypeScript) and an Express API backed by MongoDB.

## Features

- View all items
- Add an item (name, quantity, category)
- Update an item (e.g. quantity)
- Remove an item
- Clear all items

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Deployment: Vercel (frontend)

## Project Structure

```
/src                # React app
/server             # Express + Mongoose API
```

## Prerequisites

- Node.js + npm
- MongoDB running locally, or a MongoDB connection string

## Setup

Install dependencies (root + server):

```bash
npm install
npm --prefix server install
```

## Run (Development)

Start both frontend and backend from the repo root:

```bash
npm run dev
```

Defaults:

- Frontend (Vite): http://localhost:5173 (may pick another port if busy)
- Backend API: http://localhost:5000

## API

Base URL: `http://localhost:5000/api`

- `GET /health` — server status (includes DB connection info)
- `GET /items` — list items
- `POST /items` — add item
- `DELETE /items/:id` — delete one
- `DELETE /items` — delete all

### “Failed to fetch items”

This usually means one of these:

- The backend server isn't running on port `5000`
- MongoDB isn't reachable (the API may respond with `503 Database not connected`)
- MongoDB turned the cluster off due to inactivity

Quick checks:

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/items
```

## Build (Frontend)

```bash
npm run build
```
