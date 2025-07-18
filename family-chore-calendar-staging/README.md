# Family Chore Calendar - Staging Environment

This is the staging environment for the Family Chore Calendar application.

## 🎯 Purpose
- Safe testing environment for new features
- Isolated from production users
- Complete feature parity with production

## 🚀 Features
- **Admin Panel**: Role-based family management
- **Chore System**: Assignment, completion, and point tracking
- **Calendar View**: Interactive chore calendar
- **Points System**: Comprehensive point tracking and analytics
- **Auction System**: Chore bidding with smart recommendations
- **Rewards System**: Point-based reward store (staging only)
- **Suggestions**: User feedback and feature requests

## 🔧 Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🌐 Environment
- **Staging URL**: https://family-chore-calendar-staging.vercel.app
- **Database**: Prisma Accelerate PostgreSQL
- **OAuth**: Dedicated staging Google OAuth client

## 📋 Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗄️ Database
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio
```

This staging environment allows safe testing of new features before deploying to production.
