# ROOMMATE — Art Directed Living OS

**Canonical Source of Truth:** Stitch Project `12516842523132342913` (*Roommate Visual DNA*)  
**Design System Identity:** `Kinship Editorial`  
**Architecture:** MERN (MongoDB + Express.js + React + Node.js + TypeScript + Vite + Tailwind CSS + Three.js / React Three Fiber + Socket.io)

---

## 1. System Architecture

```
roommate/
├── client/              # React 18 + TypeScript + Vite + Tailwind CSS + Three.js / R3F + GSAP
│   ├── src/
│   │   ├── components/  # Foundation, 3D Scenes, Messaging, Trust, Living OS, Navigation
│   │   ├── layouts/     # PublicLayout, AuthLayout, AppLayout, SpatialLayout
│   │   ├── pages/       # Canonical Editorial Routes Shells
│   │   ├── routes/      # React Router with code-split lazy routes
│   │   ├── services/    # Typed API client & query hooks
│   │   ├── store/       # Zustand client-only stores (Auth, Spatial, UI)
│   │   └── index.css    # Kinship Editorial design tokens & typography
│
├── server/              # Node.js + Express + TypeScript + MongoDB / Mongoose + Socket.io
│   ├── src/
│   │   ├── config/      # Environment validation & MongoDB connection
│   │   ├── controllers/ # Auth, Profile, Discover, Match, Living, Trust, Reviews
│   │   ├── middleware/  # JWT Auth, Rate Limiter, Error Handler
│   │   ├── models/      # 17 Mongoose schemas & relationships
│   │   ├── routes/      # Modular REST API endpoints
│   │   ├── seeds/       # Comprehensive development seed dataset
│   │   ├── services/    # Authoritative Compatibility & Trust calculations
│   │   ├── sockets/     # Real-time WebSocket event handler
│   │   └── tests/       # Integration & verification test suite
│
├── .env.example         # Production & development environment template
├── package.json         # Monorepo orchestrator
└── README.md
```

---

## 2. Complete End-to-End Product Loop

1. **Identity & Onboarding:**
   - Landing (`/`) $\rightarrow$ Sign In / Register (`/login`, `/register`) $\rightarrow$ Chapter 01 Identity (`/onboarding/step-1`) $\rightarrow$ Chapter 02 Lifestyle DNA (`/onboarding/step-2`)
2. **Discovery & Synergy:**
   - Editorial Discover Grid (`/discover`) $\rightarrow$ Profile View (`/profile/:id`) $\rightarrow$ 4-Dimension Compatibility Lab (`/compatibility-lab`)
3. **Spatial Navigation:**
   - 3D Spatial City Explore (`/spatial`) $\rightarrow$ 3D Room Viewer (`/rooms/:id`) $\rightarrow$ Travel Mode (`/travel`)
4. **Relationship & Match:**
   - 3D Convergence Match Reveal (`/matches/:id/reveal`) $\rightarrow$ 3-Column Conversation Timeline (`/messages/:conversationId`)
5. **Living OS & Household:**
   - Active Stay Dashboard (`/stay`) $\rightarrow$ Living Agreement Builder (`/stay/agreement/builder`) $\rightarrow$ Shared Expenses (`/stay/expenses`) $\rightarrow$ Safety Center (`/stay/safety`)
6. **Trust Ledger & Feedback:**
   - Verified Stay Completion $\rightarrow$ Verified Review (`/reviews/:stayId`) $\rightarrow$ Trust Profile & Reputation Score (`/trust/:userId`) $\rightarrow$ Chronological Trust History (`/trust/:userId/history`)

---

## 3. Design System: Kinship Editorial

* **Earth Indigo (`#1a1f2c`):** Primary authoritative dark tone.
* **Human Clay (`#fcf8fa`):** Primary warm background canvas.
* **Vitality Coral (`#f05a5a`):** Synergy highlights, verification markers, high-resonance action triggers.
* **Trust Teal (`#476253`):** Verified stay credentials, safety clearances, completed audit points.
* **Surface Dim (`#dcd9db`):** Architectural hairline borders.
* **Typography:** *Playfair Display* (Editorial Serif) paired with *Public Sans* (Functional Sans).

---

## 4. Setup & Running Locally

### Prerequisites
* Node.js $\ge 18.0.0$
* MongoDB (Local or MongoDB Atlas cluster)

### Installation
```bash
# Install workspace dependencies
npm install
npm install --prefix client
npm install --prefix server
```

### Environment Configuration
```bash
cp .env.example .env
```

### Database Seeding
To populate realistic cohabitation profiles, active stays, and trust histories:
```bash
npm run seed --prefix server
```

### Running Test Suite
```bash
npm test --prefix server
```

### Running Development Servers
```bash
# Start both client and server concurrently
npm run dev

# Or independently:
npm run dev --prefix client  # http://localhost:5201 (or 5173)
npm run dev --prefix server  # http://localhost:4000
```

### Building for Production
```bash
npm run build --prefix client
npm run build --prefix server
```
