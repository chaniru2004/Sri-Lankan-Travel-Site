# Visit Sri Lanka - Official Digital Tourism Platform

> **Tagline**: *One Island. A Thousand Journeys.*

A full-stack, production-quality tourism web platform for Sri Lanka inspired by modern editorial web experiences, immersive visual storytelling, interactive mapping, custom itinerary generation, and full-featured CMS management.

---

## 🏗️ Tech Stack

- **Frontend**: Next.js (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Leaflet Maps.
- **Backend**: NestJS, Node.js, TypeScript, Passport JWT, Role-Based Access Control (RBAC).
- **Database**: PostgreSQL with Prisma ORM (PostGIS ready).
- **Architecture**: Separated Frontend & Backend Monorepo.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18.x
- Docker & Docker Compose (or local PostgreSQL server)

### 1. Database Setup
Start PostgreSQL container:
```bash
docker-compose up -d
```

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma db push
npm run seed
npm run start:dev
```
The NestJS REST API server will run at: `http://localhost:5000/api`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The Next.js application will run at: `http://localhost:3000`

---

## 🔐 Credentials & Roles

- **User**: `user@visitsrilanka.com` / `Password123!`
- **Admin**: `admin@visitsrilanka.com` / `Admin123!`

---

## 📌 Main Features

- 🌴 **Cinematic Homepage**: Fullscreen hero, search with autocomplete, "Why Sri Lanka" editorial visual cards, "Sri Lanka 365" seasonal discovery widget.
- 🗺️ **Interactive Map**: Dynamic Leaflet/Mapbox map with category filter markers and preview drawer.
- 🗓️ **Custom Trip Planner Engine**: 6-step wizard generating interactive, editable day-by-day itineraries.
- 🍛 **Taste Sri Lanka & Events**: Culinary guides and annual cultural event calendar.
- 📖 **Travel Stories**: Editorial articles with reading time and SEO metadata.
- 🛡️ **Admin CMS Portal**: Full CRUD management for destinations, attractions, experiences, events, stories, stays, and analytics.
# Sri-Lankan-Travel-Site
