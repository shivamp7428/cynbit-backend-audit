# Cynbit Backend Technical Audit

## Overview

This repository contains a backend technical audit of Cynbit's publicly accessible website, along with a demonstration of recommended backend security and performance improvements using Node.js and Express.

**Note:** This is an independent audit and demonstration project. It does not represent Cynbit's internal production backend implementation.

## Audit Deliverables

- Backend Technical Audit Report
- Security and Performance Findings
- Recommended Improvements with Code Examples

Detailed reports are available in the `report/` directory.

## Technologies Used

- Node.js
- Express.js
- Helmet
- CORS
- express-rate-limit
- Zod
- dotenv

## Implemented Demonstrations

- Security headers using Helmet
- CORS configuration
- Request body size limits
- Schema-based request validation
- Rate limiting
- Centralized error handling
- Async error handling

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/shivamp7428/cynbit-backend-audit.git
cd cynbit-backend-audit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 4. Start the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Available Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/api/test-validation` | Request validation demonstration |
| GET | `/api/test-error` | Error handling demonstration |

## Project Structure

```text
cynbit-backend-audit/
├── middleware/
├── routes/
├── utils/
├── report/
├── server.js
├── package.json
└── .gitignore
```

## Security Note

All observations were based on publicly accessible website behaviour and passive inspection. No exploitation, unauthorized access, or disruptive testing was performed.
