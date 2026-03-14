# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Primary artifact is the Elite Tenancy website — the UK's only national tenant introduction service.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/elite-tenancy)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for API), Vite (frontend)
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod

## Elite Tenancy Website

A premium UK property services website for Elite Tenancy — the only tenant introduction service operating nationwide charging landlords one transparent fee and tenants nothing.

### Pages
- `/` — Homepage with cinematic hero, split scroll, stats, process, human stories, compliance, UK map
- `/landlords` — For Landlords with RRA timeline, 6-doc verification, fee calculator
- `/tenants` — For Tenants with money flow infographic, persona cards, profile pack mockup
- `/pricing` — Complete pricing transparency with interactive fee calculator
- `/how-it-works` — Dual journey columns, timeline, FAQ
- `/renters-rights-act` — Definitive guide with interactive timeline, myth-busting cards
- `/cities` — UK city photography grid with hover stats
- `/why-us` — Why Elite Tenancy with split-screen comparison
- `/compliance` — Compliance & Legal with building metaphor
- `/contact` — Contact with routing quiz and live counters
- `/resources` — Resources/blog with landlord/tenant tracks

### Brand
- Primary gold: #C9A84C
- Background: near-black #0a0a0a
- Serif display typography (Cormorant Garamond / similar)
- Cinematic editorial aesthetic

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── elite-tenancy/      # Elite Tenancy React website
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

- `contact_submissions` — Landlord and tenant contact form submissions
- `newsletter_subscribers` — Newsletter email subscriptions

## API Routes

- `GET /api/healthz` — Health check
- `POST /api/contacts` — Submit landlord or tenant contact form
- `GET /api/stats` — Live activity statistics
- `POST /api/newsletter` — Newsletter subscription

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- Run codegen: `pnpm --filter @workspace/api-spec run codegen`
- Push DB changes: `pnpm --filter @workspace/db run push`
