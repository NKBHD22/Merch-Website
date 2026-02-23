# Mavericks 🧱🧥🛍️

A modern e-commerce platform built with Next.js (Frontend) and Node.js/Express (Backend).

## Architecture

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **Backend**: Node.js, Express.js.
- **Database**: Local JSON Storage (`test-product.json`).
- **Communication**: REST API.

## Project Structure

```
/
├── frontend/     # Next.js application
├── backend/      # Express API application
└── README.md     # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (optional, for containerized run)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (should be installed already):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## API Endpoints

- `GET /api/products` - Fetch all products
- `POST /api/products` - Add a new product

## Docker Deployment

### Prerequisites
- Docker and Docker Compose installed

### Running with Docker Compose

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

3. Stop all services:
   ```bash
   docker-compose down
   ```

- **Frontend**: Next.js app on port 3000
- **Backend**: Express API (JSON storage) on port 4000

The frontend communicates with the backend using the Docker service name `backend:4000`.

## CI/CD Deployment

This project includes a GitHub Actions workflow for automated deployment to an Ubuntu server via SSH.

### GitHub Secrets Configuration

To use the deployment workflow, you must add the following secrets to your GitHub repository (**Settings > Secrets and variables > Actions**):

1. `SSH_PRIVATE_KEY`: Your SSH private key used to access the server.
2. `SSH_HOST`: The IP address or hostname of your Ubuntu server.
3. `SSH_USERNAME`: The SSH username (e.g., `ubuntu` or `root`).
4. `SERVER_PATH`: The absolute path to the project directory on your server (e.g., `/home/ubuntu/merch-website`).

### Server Requirements

- **Docker & Docker Compose**: Must be installed on the server.
- **Project Setup**: The project should already be cloned on the server at `SERVER_PATH`.
- **Git Access**: The server should be able to `git pull` from the repository (e.g., via SSH keys or PAT).

The workflow is triggered on every push to the `main` branch.
