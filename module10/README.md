# Module 10 — Notes API

A REST API for managing notes, built with Express, Prisma, and SQLite.

## Prerequisites

- Node.js v18+
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example env file and configure it:
   ```bash
   cp .env.example .env
   ```

3. Run database migrations:
   ```bash
   npm run db:migrate
   ```

## Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

## API Endpoints

| Method | Path         | Description           |
|--------|--------------|-----------------------|
| GET    | /health      | Health check          |
| GET    | /notes       | List all notes        |
| GET    | /notes/:id   | Get a note by ID      |
| POST   | /notes       | Create a note         |
| PUT    | /notes/:id   | Update a note         |
| DELETE | /notes/:id   | Delete a note         |

### Note shape

```json
{
  "id": 1,
  "title": "My Note",
  "content": "Note body here.",
  "tag": "work",
  "createdAt": "2026-05-12T00:00:00.000Z",
  "updatedAt": "2026-05-12T00:00:00.000Z"
}
```

`tag` is optional. `title` max 100 characters, `content` max 5000 characters.

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

Tests use a separate `test.db` file and do not affect the development database.

## Other Scripts

```bash
# Open Prisma Studio (database GUI)
npm run db:studio
```
