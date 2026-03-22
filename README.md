# Nexus3D - Enterprise SaaS Platform

A production-ready Next.js 16 SaaS application featuring 3D visualization, authentication, subscriptions, and real-time dashboards.

## Features

- **Authentication**: NextAuth.js with credentials, Google OAuth, and magic links
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod) support
- **Payments**: Stripe integration with webhooks and subscription management
- **3D Visualization**: React Three Fiber with interactive product viewer
- **Dashboard**: Real-time charts using Recharts
- **UI Components**: shadcn/ui with Tailwind CSS
- **Testing**: Comprehensive Playwright E2E tests
- **Deployment**: Docker, Vercel, and Railway ready

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM
- **Auth**: NextAuth.js v5
- **Payments**: Stripe
- **3D**: React Three Fiber + Three.js
- **Charts**: Recharts
- **Testing**: Playwright
- **Email**: Nodemailer (with Mailhog for dev)

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/PopularCreature24/saas-app.git
cd saas-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Initialize database (SQLite for development)
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database (SQLite for dev)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (optional - uses Mailhog in development)
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM="noreply@example.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Commands

```bash
# Push schema to database
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed
```

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

### Testing

```bash
# Install Playwright browsers
npx playwright install

# Run tests
npx playwright test

# Run tests with UI
npx playwright test --ui

# Run specific test file
npx playwright test tests/auth.spec.ts
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Build Docker image
docker build -t saas-app .

# Run container
docker run -p 3000:3000 saas-app
```

### Railway

1. Connect GitHub repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

## Project Structure

```
saas-app/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Auth endpoints
│   │   │   ├── dashboard/# Dashboard API
│   │   │   ├── projects/ # Projects API
│   │   │   ├── stripe/   # Stripe API
│   │   │   └── user/     # User API
│   │   ├── auth/         # Auth pages
│   │   ├── dashboard/     # Dashboard pages
│   │   └── page.tsx      # Landing page
│   ├── auth/             # NextAuth configuration
│   ├── components/       # React components
│   │   ├── 3d/           # Three.js components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── layout/       # Layout components
│   │   ├── pricing/      # Pricing components
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utilities
│   │   ├── auth.tsx      # Auth provider
│   │   ├── db.ts         # Prisma client
│   │   ├── stripe.ts     # Stripe utilities
│   │   └── utils.ts     # General utilities
│   └── types/            # TypeScript types
├── tests/                # Playwright tests
├── docker-compose.yml    # Docker Compose
├── Dockerfile            # Docker build
├── vercel.json          # Vercel config
└── package.json
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `GET|POST /api/auth/[...nextauth]` - NextAuth handlers

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile
- `POST /api/user/password` - Change password

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Dashboard
- `GET /api/dashboard` - Get dashboard stats

### Stripe
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/portal` - Create billing portal session
- `POST /api/webhooks/stripe` - Stripe webhooks

## Database Schema

### User
- id, name, email, emailVerified, image, password
- Relations: accounts, sessions, subscription, projects, views

### Account
- OAuth provider accounts (Google, Email)

### Session
- Active user sessions

### Subscription
- Stripe customer info, plan tier, status

### Project
- User projects with 3D model references

### ViewLog
- Project view tracking

## Security

- Password hashing with bcrypt
- JWT session strategy
- CSRF protection via NextAuth
- Input validation with Zod
- SQL injection protection via Prisma
- Stripe webhook signature verification
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## License

MIT
