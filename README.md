# URL Shortener

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Installation

1. Clone the repository
```bash
git clone https://github.com/KayKTA/url-shortener
cd url-shortener
```

2. Start PostgreSQL
```bash
docker-compose up -d
```

3. Setup Backend
```bash
cd backend
cp .env.example .env
cp .env.test.example .env.test
npm install
npm run start:dev
```

4. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

5. Open http://localhost:5173

## 📁 Project Structure
```
├── frontend/
├── backend/
└── docker-compose.yml
```

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Material-UI, Vite
**Backend:** NestJS, TypeScript, TypeORM, PostgreSQL
**DevOps:** Docker Compose
