# Sacco Fintech Platform

A modern, scalable fintech platform designed for Savings and Credit Co-operatives (SACCOs).

## Architecture

This project is a monorepo managed by [Turbo](https://turbo.build/).

- **`apps/`**: Full-stack applications (Next.js Web App).
- **`domain/`**: Core business logic and shared domain models.
- **`packages/`**: Shared libraries and configurations (UI components, utility functions, TS configs).

## Tech Stack

- **Monorepo Management**: Turbo
- **Language**: TypeScript
- **Framework**: Next.js (Frontend & Backend API)
- **Database**: PostgreSQL / Prisma (Planned)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
