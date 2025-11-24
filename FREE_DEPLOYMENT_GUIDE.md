# 🎁 100% FREE Deployment Guide - ALX Partnership App

Deploy your entire application **completely free** using generous free tiers from modern cloud services.

---

## 💰 Total Cost: **$0/month**

All services below have **forever-free tiers** that are sufficient for production use with moderate traffic.

---

## 🗄️ Database: Supabase (FREE)

**Features**: PostgreSQL database with 500MB storage, unlimited API requests

### Setup:

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (free, no credit card required)
3. Create a new organization and project
4. Go to **Settings** → **Database**
5. Copy the **Connection String** (Transaction mode)

### Configuration:

```env
# .env.local
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

### Features:

- ✅ 500MB database (upgradable to 8GB free)
- ✅ Unlimited API requests
- ✅ Automatic backups (7 days)
- ✅ Built-in dashboard
- ✅ Real-time subscriptions
- ✅ No credit card required

---

## 📧 Email: Resend (FREE)

**Features**: 3,000 emails/month, custom domains, beautiful templates

### Setup:

1. Go to [resend.com](https://resend.com)
2. Sign up (free, no credit card)
3. Create an API key
4. Verify your domain (or use their test domain)

### Configuration:

```env
# .env.local
EMAIL_PROVIDER="resend"
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="ALX Partnership <partnerships@yourdomain.com>"
```

### Update Email Service:

```bash
npm install resend --legacy-peer-deps
```

### Features:

- ✅ 3,000 emails/month free
- ✅ Custom domain support
- ✅ Email analytics
- ✅ Webhook support
- ✅ 99.9% deliverability

**Alternative**: SendGrid (100 emails/day free)

---

## 📦 File Storage: Cloudflare R2 (FREE)

**Features**: 10GB storage, unlimited egress (no bandwidth charges!)

### Setup:

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for Cloudflare account (free)
3. Go to **R2 Object Storage**
4. Create a bucket: `alx-partnership-files`
5. Create an API token with R2 edit permissions

### Configuration:

```env
# .env.local
STORAGE_PROVIDER="r2"
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="alx-partnership-files"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"
```

### Features:

- ✅ 10GB storage free
- ✅ **Unlimited** bandwidth (no egress fees!)
- ✅ S3-compatible API
- ✅ Global CDN
- ✅ No credit card for first 10GB

**Alternative**: Supabase Storage (1GB free)

---

## 🚀 Hosting: Vercel (FREE)

**Features**: Unlimited deployments, automatic HTTPS, global CDN

### Setup:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (free)
3. Import your repository: `https://github.com/BisratJ/alx-partnership.git`
4. Configure environment variables
5. Deploy!

### Configuration:

**Add these environment variables in Vercel dashboard:**

```env
# Database (from Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
GOOGLE_AUTHORIZED_DOMAIN=alxafrica.com

# Email (Resend)
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=partnerships@yourdomain.com

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=xxxxx
R2_ACCESS_KEY_ID=xxxxx
R2_SECRET_ACCESS_KEY=xxxxx
R2_BUCKET_NAME=alx-partnership-files
```

### Features:

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL/HTTPS
- ✅ Global CDN (40+ locations)
- ✅ Preview deployments
- ✅ No credit card required

---

## 🔐 Authentication: Google OAuth (FREE)

Already configured! Google OAuth is completely free.

### Setup:

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project (free)
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-app.vercel.app/api/auth/callback/google` (production)

### Features:

- ✅ Unlimited users
- ✅ No cost
- ✅ Enterprise security
- ✅ Domain restriction support

---

## 📊 Monitoring: Sentry (FREE)

**Features**: Error tracking, 5k events/month

### Setup:

1. Go to [sentry.io](https://sentry.io)
2. Sign up (free for developers)
3. Create a new project (Next.js)
4. Copy your DSN

### Install:

```bash
npm install @sentry/nextjs --legacy-peer-deps
npx @sentry/wizard@latest -i nextjs
```

### Features:

- ✅ 5,000 errors/month free
- ✅ Performance monitoring
- ✅ Release tracking
- ✅ Source maps
- ✅ Unlimited team members

---

## 📈 Analytics: Vercel Analytics (FREE)

Already included with Vercel deployment!

### Enable:

```bash
npm install @vercel/analytics --legacy-peer-deps
```

### Add to layout:

```tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Features:

- ✅ Real-time analytics
- ✅ No cookies (privacy-friendly)
- ✅ Page views, visitors
- ✅ Performance metrics
- ✅ Free forever

---

## 🌐 Domain: Freenom or Cloudflare (FREE)

### Option 1: Use Vercel Subdomain (FREE)

- Your app gets: `your-app.vercel.app`
- Free HTTPS included
- **Recommended for testing**

### Option 2: Free Domain (.tk, .ml, .ga)

- Go to [freenom.com](https://freenom.com)
- Register a free domain
- Point to Vercel

### Option 3: Cloudflare (if you own domain)

- Free DNS
- Free DDoS protection
- Free SSL

---

## 📋 Complete Free Stack Summary

| Service            | Provider          | Free Tier                  | Monthly Cost |
| ------------------ | ----------------- | -------------------------- | ------------ |
| **Database**       | Supabase          | 500MB, unlimited requests  | $0           |
| **Email**          | Resend            | 3,000 emails               | $0           |
| **File Storage**   | Cloudflare R2     | 10GB + unlimited bandwidth | $0           |
| **Hosting**        | Vercel            | 100GB bandwidth            | $0           |
| **Authentication** | Google OAuth      | Unlimited                  | $0           |
| **Monitoring**     | Sentry            | 5k events                  | $0           |
| **Analytics**      | Vercel Analytics  | Unlimited                  | $0           |
| **Domain**         | Vercel subdomain  | .vercel.app                | $0           |
| **SSL/HTTPS**      | Vercel            | Automatic                  | $0           |
| **CDN**            | Vercel/Cloudflare | Global                     | $0           |
| **TOTAL**          | -                 | -                          | **$0**       |

---

## 🚀 Quick Deploy Steps (15 minutes)

### Step 1: Setup Supabase (5 min)

```bash
# 1. Create Supabase project at supabase.com
# 2. Copy connection strings
# 3. Update .env.local
```

### Step 2: Setup Resend (3 min)

```bash
# 1. Sign up at resend.com
# 2. Get API key
# 3. Update .env.local
npm install resend --legacy-peer-deps
```

### Step 3: Setup Cloudflare R2 (5 min)

```bash
# 1. Create Cloudflare account
# 2. Create R2 bucket
# 3. Get credentials
# 4. Update .env.local
```

### Step 4: Deploy to Vercel (2 min)

```bash
# 1. Push code to GitHub (already done!)
# 2. Import repo on vercel.com
# 3. Add environment variables
# 4. Deploy!
```

---

## 🔧 Updated Environment Variables

Create `.env.local` with **FREE** services:

```env
# Database - Supabase (FREE)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# NextAuth (FREE)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (FREE)
GOOGLE_CLIENT_ID="your-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-secret"
GOOGLE_AUTHORIZED_DOMAIN="alxafrica.com"

# Email - Resend (FREE 3k/month)
EMAIL_PROVIDER="resend"
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="ALX Partnership <partnerships@yourdomain.com>"

# File Storage - Cloudflare R2 (FREE 10GB)
STORAGE_PROVIDER="r2"
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="alx-partnership-files"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"

# Monitoring - Sentry (FREE 5k events/month)
SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"

# App Config
NODE_ENV="production"
APP_NAME="ALX Partnership"
APP_URL="https://your-app.vercel.app"
```

---

## 📊 Free Tier Limits

### Will These Limits Be Enough?

**For 1,000 monthly partnership applications:**

| Service        | Usage          | Limit          | Sufficient?            |
| -------------- | -------------- | -------------- | ---------------------- |
| Supabase DB    | 1,000 rows     | Unlimited rows | ✅ YES                 |
| Resend Email   | 4,000 emails   | 3,000/month    | ⚠️ Upgrade to SendGrid |
| R2 Storage     | ~5GB files     | 10GB           | ✅ YES                 |
| Vercel Hosting | 50GB bandwidth | 100GB          | ✅ YES                 |
| Sentry Errors  | ~500 errors    | 5,000/month    | ✅ YES                 |

### If You Exceed Limits:

**Email (3,000/month exceeded):**

- Switch to SendGrid (100 emails/day = 3,000/month free)
- Or use both Resend + SendGrid together

**Storage (10GB exceeded):**

- Upgrade Supabase to Pro ($25/month, 8GB)
- Or use multiple R2 buckets
- Or compress images more aggressively

---

## 🎯 Alternative Free Services

### Email Alternatives:

1. **SendGrid** - 100 emails/day free (3,000/month)
2. **Mailgun** - 5,000 emails/month free (first 3 months)
3. **Brevo** (Sendinblue) - 300 emails/day free

### Database Alternatives:

1. **Neon** - 10GB storage, 1 project free
2. **Railway** - $5 credit/month (free)
3. **PlanetScale** - 5GB storage, 1 billion reads free
4. **Aiven** - 1-month free trial

### Hosting Alternatives:

1. **Netlify** - 100GB bandwidth/month free
2. **Railway** - $5 credit/month
3. **Render** - Static sites free, web services free tier
4. **Fly.io** - 3 VMs free

---

## 💡 Cost Optimization Tips

### 1. Image Optimization

```bash
# Use Next.js Image component (automatic)
import Image from 'next/image';
```

### 2. Database Optimization

- Add indexes (already done in schema)
- Use connection pooling (Supabase includes)
- Archive old requests after 1 year

### 3. Email Optimization

- Send only critical emails
- Batch notifications
- Use both Resend (3k) + SendGrid (3k) = 6k/month free

### 4. Storage Optimization

- Compress images before upload
- Set max file sizes (already done: 5MB PDF, 2MB images)
- Delete files when requests are rejected

---

## 🔄 Migration from Paid to Free

If you started with paid services, here's how to migrate:

### From AWS RDS to Supabase:

```bash
# 1. Export from AWS
pg_dump -h aws-endpoint -U postgres -d dbname > backup.sql

# 2. Import to Supabase
psql -h db.supabase.co -U postgres -d postgres -f backup.sql
```

### From AWS SES to Resend:

- Update EMAIL_PROVIDER in .env
- Update email service code (provided below)

### From AWS S3 to Cloudflare R2:

- R2 is S3-compatible! Just change credentials
- No code changes needed

---

## ✅ Success Checklist

- [ ] Supabase database created and connected
- [ ] Resend API key configured
- [ ] Cloudflare R2 bucket created
- [ ] Vercel deployment successful
- [ ] Google OAuth configured
- [ ] Test form submission works
- [ ] Test email delivery
- [ ] Test file uploads
- [ ] Monitoring enabled (Sentry)
- [ ] Analytics enabled

---

## 🎉 Benefits of Free Stack

✅ **$0 monthly cost** for production app  
✅ **Scales automatically** with traffic  
✅ **Enterprise-grade** reliability  
✅ **Global CDN** for fast performance  
✅ **Automatic backups** (Supabase)  
✅ **99.9% uptime** SLAs  
✅ **No credit card** required to start  
✅ **Easy upgrades** when needed

---

## 📞 Support

All free services have excellent documentation:

- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Resend: [resend.com/docs](https://resend.com/docs)
- Cloudflare R2: [developers.cloudflare.com/r2](https://developers.cloudflare.com/r2)
- Vercel: [vercel.com/docs](https://vercel.com/docs)

---

**Total Setup Time**: ~30 minutes  
**Monthly Cost**: **$0**  
**Production Ready**: ✅ YES

🎁 Deploy your entire app for **FREE** today!
