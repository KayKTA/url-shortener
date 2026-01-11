# URL Shortener

A modern, full-stack URL shortener application built with React and NestJS. Transform long URLs into short, shareable links with a clean and intuitive interface.

## Features

- **URL Shortening**: Convert long URLs into short, easy-to-share links
- **Instant Redirect**: Automatically redirect users from short URLs to original destinations
- **URL History**: Keep track of all your shortened URLs with local storage
- **Clean UI**: Modern, responsive interface built with Material-UI
- **Type-Safe**: Full TypeScript implementation across frontend and backend
- **Database Persistence**: PostgreSQL database for reliable URL storage
- **Testing**: Core E2E tests with separate test environment

## Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Material-UI** - Beautiful, accessible component library
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe server code
- **TypeORM** - Object-relational mapping
- **PostgreSQL** - Robust relational database
- **Class Validator** - DTO validation

### DevOps
- **Docker & Docker Compose** - Containerized database setup
- **Jest** - Testing framework
- **Concurrently** - Run multiple dev servers in parallel

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18 or higher
- **npm** or **yarn**
- **Docker** and **Docker Compose**

## Getting Started

### Quick Start (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/KayKTA/url-shortener.git
cd url-shortener

# 2. Copy environment files
cp backend/.env.example backend/.env
cp backend/.env.test.example backend/.env.test

# 3. Setup everything (Docker, dependencies)
npm run setup

# 4. Start development servers (backend + frontend)
npm run dev
```

That's it! The application will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

> **Note**: The `setup` script starts Docker services and installs all dependencies. You need to manually copy the `.env.example` files to `.env` files before running setup.


## Project Structure
```
url-shortener/
├── backend/          # NestJS backend
├── frontend/         # React frontend
├── docker-compose.yml
├── package.json      # Root scripts (setup, dev, test)
└── README.md
```

## API Endpoints

### POST /api/shorten
Create a shortened URL

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3000/abc123",
  "code": "abc123",
  "originalUrl": "https://example.com/very-long-url",
  "createdAt": "2024-01-11T12:00:00.000Z"
}
```

### GET /:code
Redirect to the original URL

**Example:**
```
http://localhost:3000/abc123 → https://example.com/very-long-url
```

## Environment Variables

### Backend (.env)

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=urlshortener

# Application
PORT=3000
```

### Backend Test (.env.test)

```env
# Test Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=urlshortener_test

# Application
PORT=3001
```

## Testing

The application includes core E2E tests covering main flows.

### Run Tests

```bash
cd backend
npm run test:e2e
```

The tests use a separate PostgreSQL instance (port 5433) to avoid interfering with development data.

## Docker Services

The `docker-compose.yml` file defines two services:

1. **postgres** (Development)
   - Port: 5432
   - Database: urlshortener
   - Persistent volume: postgres_data

2. **postgres_test** (Testing)
   - Port: 5433
   - Database: urlshortener_test
   - Persistent volume: postgres_test_data

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Remove volumes (WARNING: deletes all data)
docker-compose down -v
```

## Development Workflow

### First Time Setup
1. **Clone the repository**: `git clone https://github.com/KayKTA/url-shortener.git && cd url-shortener`
2. **Copy environment files**: `cp backend/.env.example backend/.env && cp backend/.env.test.example backend/.env.test`
3. **Complete setup**: `npm run setup` (starts Docker, installs dependencies)
4. **Start development**: `npm run dev`

### Daily Development
1. **Start services**: `npm run dev` (starts both backend and frontend)
2. **Make changes**: Edit code with hot reload enabled
3. **Run tests**: `npm run test:e2e`
4. **Stop services**: `Ctrl+C` to stop dev servers, `npm run docker:down` to stop Docker

### Useful Commands
- **Reset environment files**: Delete `.env` files and copy them again from `.env.example` templates
- **Restart Docker only**: `npm run docker:down && npm run docker:up`
- **Reinstall dependencies**: `npm run install:all`

## How It Works

1. **User submits a URL** through the frontend form
2. **Frontend validates** the URL format (HTTP/HTTPS protocol)
3. **API request** sent to `/api/shorten` endpoint
4. **Backend generates** a unique short code
5. **URL stored** in PostgreSQL database
6. **Short URL returned** to the user
7. **User shares** the short URL
8. **Visitors click** the short URL
9. **Backend redirects** (302) to the original URL

## Features in Detail

### URL Shortening Algorithm
- Generates unique alphanumeric codes
- Uses lowercase characters for consistency
- Indexed database lookups for fast redirects
- Collision detection and retry mechanism

### URL History
- Stores shortened URLs in browser's local storage
- Displays history in reverse chronological order
- One-click copy to clipboard
- Delete individual entries
- Persists across browser sessions

### Validation
- Frontend validation for URL format (HTTP/HTTPS)
- Backend validation with class-validator
- URL format verification
- Error handling and user feedback

## Next Steps (Production Readiness)

If this project were to be pushed toward production, the next steps would focus on robustness, security, and scalability:

* Rate limiting and abuse prevention on the shortening endpoint
* Improved observability (structured logs, metrics, monitoring)
* Security hardening (allowed schemes, malicious URL detection)

## Author

**KayKTA**
