# Auth JWT Refresh Token Backend

Express.js backend with JWT authentication and refresh token mechanism.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MariaDB (via Prisma ORM)
- **Authentication**: JWT (Access + Refresh tokens)
- **Validation**: Zod
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v18+)
- MariaDB (running on localhost:3306)
- npm

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd express-jwt-refresh-token
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your secrets:
```bash
# Generate secure secrets:
# ACCESS_TOKEN_SECRET=$(openssl rand -hex 64)
# REFRESH_TOKEN_SECRET=$(openssl rand -hex 64)
```

5. Create the database:
```bash
# Login to MariaDB
mysql -u root -p

# Create database
CREATE DATABASE your_database_name;
```

6. Run Prisma migrations:
```bash
npx prisma migrate dev
```

## Running

Development mode (with hot reload):
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The server will start on `http://localhost:8080`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Products (protected routes)
- `GET /api/products` - List user's products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
