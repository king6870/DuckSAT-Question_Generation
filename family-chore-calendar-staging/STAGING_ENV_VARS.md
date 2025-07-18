# 🔐 Staging Environment Variables

**⚠️ IMPORTANT: This file is for reference only. Never commit actual secrets to git!**

## 📋 Required Vercel Environment Variables (Preview Environment)

Add these to your Vercel Dashboard → Settings → Environment Variables → Preview:

### Database Configuration
```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19RU3U4V08xcDJqTDNTYV9yT3pkRzAiLCJhcGlfa2V5IjoiMDFLMEQxM0dCUU5XUFROMFhKNFY2NzZETkciLCJ0ZW5hbnRfaWQiOiI0NDU4MTk4YjMzZjZkNWJhMTFiODA2OTU5NGM5MzY2MWQyZTViM2JhMmNhNmViODkwZjEwMjE0MGI4NTY1ZGFmIiwiaW50ZXJuYWxfc2VjcmV0IjoiYjhlZmJlNzItMWRhMC00NTA3LWE1ZjMtOWU0MGQ1YmE5YTUxIn0.qqA-bRWXV8SvwO4iF_ofd32LZ2NXgzvcOY_31Hu61Rc
```

### Authentication Configuration
```
NEXTAUTH_URL=https://family-chore-calendar-git-staging-duckys-projects-22b2b673.vercel.app
NEXTAUTH_SECRET=hSx7PjeugAKPk0lWLkuDrAjwE8v132a02GM4rtZ5zuc=
```

### Google OAuth Configuration
```
GOOGLE_CLIENT_ID=755830677010-5lah4ispmh61q7jl7c9ua9ibsf569pi6.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

## 🚀 Setup Instructions

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select Project**: family-chore-calendar
3. **Navigate**: Settings → Environment Variables
4. **Add Variables**: Copy each variable above
5. **Set Environment**: Preview (for staging deployments)
6. **Save**: Click save for each variable

## 🔒 Security Notes

- **Never commit this file to git** (it's in .gitignore)
- **Use Vercel Dashboard only** for managing secrets
- **Preview Environment** targets staging deployments
- **Production Environment** uses different values

## ⚡ Prisma Accelerate Benefits

- **Global Edge Network**: Reduced latency worldwide
- **Intelligent Caching**: Automatic query result caching
- **High Performance**: Optimized database connections
- **Real-time Analytics**: Query performance monitoring

## 🧪 Testing Staging Environment

After deployment, test these features:
- ✅ User authentication and sign-in
- ✅ Family creation and management
- ✅ Chore completion and points system
- ✅ Rewards system (available in staging)
- ✅ Admin panel functionality
- ✅ Database performance with Accelerate
