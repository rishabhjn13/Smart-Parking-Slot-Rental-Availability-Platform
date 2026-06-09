# Smart Parking Slot Rental & Availability Platform
### Technical Architecture & Stack Documentation
**Project:** Internship Project 1 — Full Stack Web Development

**Version:** 1.0.0 (Draft for Review)

**Classification:** Internal Technical Reference

---

## Table of Contents

1. [Architecture Decision](#1-architecture-decision)
2. [System Design Overview](#2-system-design-overview)
3. [Tech Stack Summary](#3-tech-stack-summary)
4. [Frontend](#4-frontend)
5. [Backend](#5-backend)
6. [Database Layer](#6-database-layer)
7. [Maps & Location Services](#7-maps--location-services)
8. [Authentication & Security](#8-authentication--security)
9. [File Storage & Media](#9-file-storage--media)
10. [Email & Notifications](#10-email--notifications)
11. [Deployment & Hosting](#11-deployment--hosting)
12. [Developer Tooling](#12-developer-tooling)
13. [Free Tier & Cost Overview](#13-free-tier--cost-overview)
14. [Project Folder Structure](#14-project-folder-structure)
15. [Development Phases](#15-development-phases)
16. [Open Questions & Future Decisions](#16-open-questions--future-decisions)

---

## 1. Architecture Decision

### Chosen Architecture: Modular Monolith

For Phase 1 of this project, a **Modular Monolith** architecture is recommended over a full Microservices approach.

**Reasoning:**

| Factor | Microservices | Modular Monolith (Chosen) |
|---|---|---|
| Complexity | High — multiple deployments, inter-service comms | Low — single deployable unit |
| Team size fit | Large teams (5+) | Small / solo developer |
| Free-tier hosting | Expensive — each service needs a server | Economical — one server instance |
| Development speed | Slow initial setup | Fast iteration |
| Scalability path | Native horizontal scaling | Can be split into microservices later |
| Debugging | Hard — distributed tracing needed | Easy — single process, single log |

The codebase will be **internally modular** (clean separation of concerns by domain: users, owners, bookings, listings, admin), making a future migration to microservices straightforward if the product scales.

---

## 2. System Design Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                     │
│         React (Vite) — Web Browser (Responsive)     │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / REST API
┌────────────────────▼────────────────────────────────┐
│                  API GATEWAY LAYER                  │
│           Express.js (Node.js) — REST API           │
│   Auth Middleware │ Rate Limiter │ Request Validator │
└──────┬──────┬─────┴──────┬───────────┬──────────────┘
       │      │            │           │
  ┌────▼──┐ ┌─▼──────┐ ┌──▼─────┐ ┌──▼──────┐
  │Users  │ │Listings│ │Bookings│ │ Admin   │
  │Module │ │Module  │ │Module  │ │ Module  │
  └────┬──┘ └─┬──────┘ └──┬─────┘ └──┬──────┘
       └───────┴───────────┴──────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                  DATA LAYER                         │
│         PostgreSQL (Primary DB — Supabase)          │
│         Redis (optional — caching, sessions)        │
└────────────────────┬────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┐
  ┌────▼──────┐             ┌──────▼──────┐
  │ Cloudinary│             │   Mapbox    │
  │  (Media)  │             │ (Maps/Geo)  │
  └───────────┘             └─────────────┘
```

**Key Design Principles:**
- REST API with clear versioning (`/api/v1/`)
- Role-based access control (RBAC) — `user`, `owner`, `admin`
- JWT-based stateless authentication
- Domain-driven module separation in backend
- Mobile-first responsive frontend

---

## 3. Tech Stack Summary

| Layer | Technology | Purpose | Free Tier |
|---|---|---|---|
| Frontend Framework | React 18 + Vite (Stitch AI) | UI rendering & routing | ✅ Open Source |
| UI Component Library | shadcn/ui + Tailwind CSS | Design system | ✅ Open Source |
| State Management | Zustand | Client-side state | ✅ Open Source |
| Backend Framework | Node.js + Express.js | REST API server | ✅ Open Source |
| Primary Database | PostgreSQL via Supabase | Relational data | ✅ Free tier (500MB) |
| ORM | Prisma | DB schema & queries | ✅ Open Source |
| Authentication | Supabase Auth | JWT + OAuth | ✅ Free tier |
| Maps | Mapbox GL JS | Map display & search | ✅ 50K loads/mo free |
| File Storage | Cloudinary | Parking slot photos | ✅ 25GB free |
| Email | Firebase + Nodemailer via Gmail SMTP  | Booking confirmations | ✅ 2,000 emails/day free |
| Deployment — Frontend | Vercel | Static hosting | ✅ Free hobby tier |
| Deployment — Backend | Render | Node server hosting | ✅ Free tier |
| Version Control | GitHub | Source control | ✅ Free |

---

## 4. Frontend

### Framework: React 18 + Vite

**Why React:**
- Industry-standard for internship/job relevance
- Rich ecosystem (maps, date pickers, form libs)
- Component architecture maps well to the 3-role dashboard structure (User / Owner / Admin)

**Why Vite over CRA:**
- Significantly faster dev server (HMR in milliseconds)
- Better build output
- Modern default in 2024+

### UI & Styling: Tailwind CSS + shadcn/ui

**Why Tailwind:**
- Utility-first — fast responsive layout construction
- No context-switching between CSS files

**Why shadcn/ui:**
- Unstyled, copy-paste component library (Dialogs, Dropdowns, Tables, Forms)
- Works natively with Tailwind
- No version conflicts — you own the component code

### Key Frontend Libraries

| Library | Purpose |
|---|---|
| `react-router-dom` v6 | Client-side routing (User / Owner / Admin routes) |
| `zustand` | Lightweight global state (auth, booking flow) |
| `react-hook-form` + `zod` | Form handling + validation |
| `mapbox-gl` | Interactive map for parking slot discovery |
| `@tanstack/react-query` | Server state, caching, API calls |
| `date-fns` | Date/time manipulation for booking windows |
| `axios` | HTTP client for API calls |
| `recharts` | Charts on admin/owner dashboards |
| `react-hot-toast` | Booking confirmation toasts/notifications |

### Frontend Architecture Pattern

```
src/
├── pages/          # Route-level page components
├── components/     # Reusable UI components
├── features/       # Domain-grouped feature modules
│   ├── auth/
│   ├── search/
│   ├── booking/
│   ├── owner/
│   └── admin/
├── hooks/          # Custom React hooks
├── store/          # Zustand stores
├── lib/            # Utilities, API client, constants
└── types/          # TypeScript type definitions
```

---

## 5. Backend

### Framework: Node.js + Express.js

**Why Node.js + Express:**
- JavaScript full-stack cohesion (same language as frontend)
- Excellent async I/O for location-based search queries
- Massive ecosystem
- Straightforward to deploy on Render free tier

**Why not FastAPI / Django:**
- Python backend would require managing two languages and two deployment units
- Express is more than sufficient for this project scope

### Language: TypeScript (Backend)

TypeScript is strongly recommended for both frontend and backend. It catches type errors at compile time, improves IDE autocomplete, and is now the industry default for serious Node.js projects.

### Backend Module Structure

```
src/
├── modules/
│   ├── auth/           # Registration, login, JWT
│   ├── users/          # Driver profile, booking history
│   ├── owners/         # Owner profile, verification
│   ├── listings/       # Parking slot CRUD, availability
│   ├── bookings/       # Reserve, confirm, cancel, complete
│   └── admin/          # Verification, reports, user mgmt
├── middleware/         # Auth guard, rate limiter, error handler
├── lib/                # Prisma client, email client, cloudinary
├── routes/             # Express router wiring
└── types/              # Shared type definitions
```

### Key Backend Libraries

| Library | Purpose |
|---|---|
| `express` | HTTP server & routing |
| `prisma` | ORM + database migrations |
| `@supabase/supabase-js` | Auth token verification |
| `zod` | Request body validation |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT signing/verification |
| `multer` + `cloudinary` | Photo upload handling |
| `nodemailer` / `resend` | Email dispatch |
| `express-rate-limit` | API rate limiting |
| `cors` | Cross-origin setup |
| `helmet` | HTTP security headers |
| `morgan` | Request logging |

### API Design

Base URL: `https://api.yourdomain.com/api/v1`

**Core Endpoints (High-Level):**

```
Auth
  POST   /auth/register
  POST   /auth/login
  POST   /auth/logout

Listings (Parking Slots)
  GET    /listings?lat=&lng=&radius=&date=&vehicle=
  GET    /listings/:id
  POST   /listings           [owner only]
  PUT    /listings/:id       [owner only]
  DELETE /listings/:id       [owner only]

Bookings
  POST   /bookings           [user only]
  GET    /bookings/my        [user — booking history]
  GET    /bookings/owner     [owner — incoming bookings]
  PATCH  /bookings/:id/confirm   [owner]
  PATCH  /bookings/:id/cancel    [user/owner]

Admin
  GET    /admin/users
  GET    /admin/listings/pending
  PATCH  /admin/listings/:id/verify
  GET    /admin/reports/bookings
```

---

## 6. Database Layer

### Primary Database: PostgreSQL via Supabase

**Why PostgreSQL:**
- Relational model is a natural fit: Users → Bookings → Listings → Owners
- PostGIS extension (built into Supabase) enables native geo-spatial queries (`ST_DWithin`, `ST_Distance`) — critical for "find parking near me"
- ACID compliance for booking integrity (no double-booking)

**Why Supabase (not raw Heroku PG):**
- Managed PostgreSQL with dashboard UI — no manual pg config
- Built-in Auth service
- Free tier: 500MB database, unlimited API calls
- Row Level Security (RLS) for role-based data access

**Why Prisma as ORM:**
- Type-safe queries generated from your schema — no raw SQL bugs
- Auto-generated migration files
- Works perfectly with Supabase PostgreSQL

### Core Database Schema (Simplified)

```sql
-- Users table (drivers)
users (id, email, name, phone, role, created_at)

-- Owners table (parking space owners)
owners (id, user_id FK, verification_status, id_proof_url, created_at)

-- Listings table (parking spaces)
listings (
  id, owner_id FK, title, description,
  address, city,
  latitude, longitude,    -- for geo queries
  total_slots, available_slots,
  vehicle_types[],        -- ['2-wheeler', '4-wheeler']
  pricing_hourly, pricing_daily, pricing_monthly,
  availability_start, availability_end,
  is_verified, is_active,
  photos[],
  created_at
)

-- Bookings table
bookings (
  id, user_id FK, listing_id FK,
  vehicle_type, vehicle_number,
  start_time, end_time,
  total_price, status,   -- pending/confirmed/active/completed/cancelled
  created_at
)

-- Blocked dates (owner blocks)
blocked_slots (id, listing_id FK, blocked_from, blocked_to, reason)
```

### Geo-spatial Query Example (Supabase RPC)

```sql
-- Find listings within 2km of user's location
SELECT * FROM listings
WHERE ST_DWithin(
  geography(ST_MakePoint(longitude, latitude)),
  geography(ST_MakePoint($user_lng, $user_lat)),
  2000  -- meters
)
AND is_active = true AND is_verified = true;
```

---

## 7. Maps & Location Services

### Map Display: Mapbox GL JS

**Why Mapbox over Google Maps:**
- Free tier: 50,000 map loads/month (more than sufficient for Phase 1)
- Google Maps requires a billing account even for free usage
- Mapbox has a cleaner SDK for custom marker rendering
- No credit card needed to start

**Why Mapbox over Leaflet + OpenStreetMap:**
- Better visual quality out of the box
- Built-in geocoding API (search by address)
- Directions and traffic data available for future phases

### Mapbox Services Used

| Service | Use Case | Free Limit |
|---|---|---|
| Mapbox GL JS | Render interactive map with parking markers | 50K loads/mo |
| Mapbox Geocoding API | Convert address text → lat/lng coordinates | 100K req/mo |
| Mapbox Static API | Thumbnail map previews on listing cards | 50K req/mo |

### Location Flow

```
User types address → Mapbox Geocoding → lat/lng
→ Send to backend → PostGIS spatial query
→ Return listings with distance
→ Render pins on Mapbox GL map
→ User clicks pin → View listing detail
```

---

## 8. Authentication & Security

### Auth Strategy: Supabase Auth + JWT

**Supabase Auth provides:**
- Email/password registration and login
- JWT tokens (access + refresh)
- Email verification on signup
- Password reset via email
- OAuth (Google login) — optional but easy to add

**Role-based access control** will be handled in the backend middleware layer using the `role` field stored in the JWT payload: `user`, `owner`, `admin`.

### Security Checklist

| Concern | Solution |
|---|---|
| Password storage | bcryptjs (salted hashing) — handled by Supabase Auth |
| API authentication | JWT Bearer token on all protected routes |
| Input validation | Zod schema validation on all request bodies |
| SQL injection | Prisma ORM (parameterized queries by default) |
| XSS | React escapes by default; CSP headers via Helmet |
| CORS | Configured whitelist of frontend origin |
| Rate limiting | `express-rate-limit` on auth + booking endpoints |
| HTTPS | Enforced by Vercel (frontend) and Render (backend) |
| Sensitive env vars | `.env` files; never committed to Git |

---

## 9. File Storage & Media

### Service: Cloudinary

**Used for:** Parking slot photos uploaded by owners

**Why Cloudinary:**
- Free tier: 25GB storage + 25GB bandwidth/month
- Built-in image transformations (auto-resize, compress, WebP conversion)
- Simple Node.js SDK (`cloudinary` npm package)
- CDN delivery globally

**Upload Flow:**
```
Owner selects photo → Frontend sends to backend (multipart)
→ Backend (multer buffer) → Cloudinary SDK → Returns CDN URL
→ URL stored in listings.photos[] in PostgreSQL
```

---

## 10. Email & Notifications

### Service: Resend

**Why Resend:**
- Free tier: 3,000 emails/month, 100/day — sufficient for Phase 1
- Modern developer-focused API (not legacy SMTP)
- React Email integration for HTML templates
- No credit card required

**Email Events:**

| Trigger | Recipient | Content |
|---|---|---|
| User registers | User | Welcome + email verification |
| Booking confirmed | User | Booking details, address, QR (future) |
| Booking cancelled | User | Cancellation confirmation |
| New booking received | Owner | Booking request with user details |
| Listing verified | Owner | Admin approval notification |

---

## 11. Deployment & Hosting

### Frontend: Vercel

- **Plan:** Hobby (Free)
- **What it hosts:** React + Vite static build
- **Deployment:** Auto-deploy on `git push` to `main`
- **Domain:** Free `.vercel.app` subdomain (custom domain optional)
- **Limits:** 100GB bandwidth/month — more than enough for Phase 1

### Backend: Render

- **Plan:** Free Web Service
- **What it hosts:** Node.js + Express API
- **Deployment:** Auto-deploy from GitHub
- **Important caveat:** Free tier spins down after 15 minutes of inactivity (cold start ~30 seconds). For demo/internship purposes this is acceptable. Upgrade to Starter ($7/mo) to eliminate cold starts.
- **Environment variables:** Set in Render dashboard

### Database: Supabase

- **Plan:** Free tier
- **Limits:** 500MB database storage, 2GB file storage, 50MB file uploads
- **Region:** Choose closest to your users (e.g., `ap-south-1` for India)
- **Pausing policy:** Free projects pause after 1 week of inactivity — run a keep-alive ping for demos

### Summary Table

| Service | Free Tier Limit | Upgrade Cost |
|---|---|---|
| Vercel | 100GB bandwidth/mo | $20/mo Pro |
| Render | Spins down on idle | $7/mo Starter |
| Supabase | 500MB DB, pauses on idle | $25/mo Pro |
| Mapbox | 50K map loads/mo | Pay-as-you-go |
| Cloudinary | 25GB storage + bandwidth | $89/mo Plus |
| Resend | 3K emails/mo | $20/mo |

---

## 12. Developer Tooling

| Tool | Purpose |
|---|---|
| **VS Code** | Primary IDE |
| **ESLint + Prettier** | Code linting and formatting |
| **Husky + lint-staged** | Pre-commit hooks |
| **Git + GitHub** | Version control |
| **Postman / Hoppscotch** | API testing during development |
| **Prisma Studio** | Visual database browser |
| **dotenv** | Environment variable management |
| **TypeScript** | Type safety across frontend + backend |

---

## 13. Free Tier & Cost Overview

**Total estimated monthly cost for Phase 1 (at low traffic): $0**

All services listed operate comfortably within free tiers for an internship-scale project. The only cost consideration is upgrading Render ($7/mo) to prevent cold starts for a live demo, which is optional.

---

## 14. Project Folder Structure

```
smart-parking/
├── client/                     # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── search/
│   │   │   ├── booking/
│   │   │   ├── owner/
│   │   │   └── admin/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── lib/
│   │   └── types/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── owners/
│   │   │   ├── listings/
│   │   │   ├── bookings/
│   │   │   └── admin/
│   │   ├── middleware/
│   │   ├── lib/
│   │   ├── routes/
│   │   └── types/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── .github/
│   └── workflows/              # CI/CD (optional)
└── README.md
```

---

## 15. Development Phases

### Phase 1 — Foundation (Week 1–2)
- Project scaffolding (Vite + Express + Prisma setup)
- Database schema design and migrations
- Supabase Auth integration
- User and Owner registration/login flows
- Basic listing CRUD (owner dashboard)

### Phase 2 — Core Features (Week 3–4)
- Mapbox integration — map display + geocoding
- Location-based listing search
- Booking flow (create, confirm, cancel)
- Email notifications via Resend
- Cloudinary photo upload for listings

### Phase 3 — Dashboards & Admin (Week 5)
- User dashboard — booking history, status tracking
- Owner dashboard — earnings, booking management, block dates
- Admin panel — owner verification, listing approval, reports

### Phase 4 — Polish & Deployment (Week 6)
- Mobile responsiveness audit
- Security hardening (helmet, rate limiter, input validation)
- Deploy frontend to Vercel, backend to Render
- Environment configuration and end-to-end testing
- Documentation finalization

---

## 16. Open Questions & Future Decisions

The following decisions are deferred and should be revisited before development begins:

1. **Payment Integration** — The scope says "payment-ready architecture." Options for future: Razorpay (India-focused, excellent free sandbox) or Stripe. No live payments in Phase 1.

2. **Google OAuth** — Supabase makes this a one-switch toggle. Decide if social login is required.

3. **Redis Caching** — For geo-search query caching. Upstash (serverless Redis) has a free tier (10K requests/day). Add in Phase 2 if search latency is a concern.

4. **Real-time availability updates** — Supabase Realtime (WebSocket subscriptions) can push availability changes to the map without polling. Evaluate need in Phase 3.

5. **Monorepo tooling** — For a 2-package repo (client + server), a simple shared `package.json` with workspaces scripts is sufficient. Turborepo is an option if build times become an issue.

---

*This document is a living draft. Suggest changes, additions, or swaps against any technology choice before development begins.*
