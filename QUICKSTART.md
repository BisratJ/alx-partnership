# 🚀 Quick Start Guide - ALX Partnership App

Get the app running in **under 10 minutes**.

---

## Prerequisites

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org))
- **PostgreSQL** >= 14 ([Download](https://www.postgresql.org/download/))
- **Google Cloud Account** (for OAuth)
- **SMTP Server** or Gmail account (for emails)

---

## Step 1: Install Dependencies (2 min)

```bash
cd "/Users/bisratgizaw/Downloads/ALX Partnership"
npm install
```

This installs all required packages (~300MB).

---

## Step 2: Configure Environment (3 min)

### Create environment file

```bash
cp .env.example .env.local
```

### Edit `.env.local` with your values

**Minimum required configuration**:

```env
# Database (create a PostgreSQL database first)
DATABASE_URL="postgresql://postgres:password@localhost:5432/alx_partnership"

# NextAuth (generate secret with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_AUTHORIZED_DOMAIN="alxafrica.com"

# Email (use Gmail or SMTP server)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="ALX Partnership <your-email@gmail.com>"

# File Storage (for development, use local or free S3-compatible)
S3_BUCKET="alx-partnership-dev"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
```

### Quick Setup Help

#### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

#### Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Generate password for "Mail"
5. Use this as `SMTP_PASSWORD`

---

## Step 3: Setup Database (2 min)

### Create PostgreSQL database

```bash
# Using PostgreSQL CLI
createdb alx_partnership

# Or using psql
psql -U postgres
CREATE DATABASE alx_partnership;
\q
```

### Run migrations and seed

```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# Seed initial data (hubs, admin user)
npm run prisma:seed
```

**Expected output**:

```
✅ Database seeded successfully!
{ capstone: {...}, citypoint: {...}, virtual: {...}, admin: {...} }
```

---

## Step 4: Start Development Server (1 min)

```bash
npm run dev
```

**Expected output**:

```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Ready in 1.2s
```

---

## Step 5: Test the Application (2 min)

### Visit the app

Open browser: http://localhost:3000

### Test submission (Public Form)

1. Click **"Apply for Partnership"**
2. Fill in the form:
   - Organization: "Test Org"
   - Email: "test@example.com"
   - Event date: Select a date 20 days from today
   - Upload a PDF file
3. Submit and check email for confirmation

### Test dashboard (Staff Login)

1. Click **"Staff Login"**
2. Sign in with Google (must be @alxafrica.com or your configured domain)
3. View submitted requests
4. Assign and update status

---

## ✅ Verification Checklist

After setup, verify:

- [ ] App loads at http://localhost:3000
- [ ] Can submit a partnership request
- [ ] Email confirmation received
- [ ] Can log in with Google OAuth
- [ ] Dashboard shows submitted requests
- [ ] Database has data (`npm run prisma:studio` to view)

---

## 🔧 Troubleshooting

### Database connection failed

**Error**: `Can't reach database server`

**Fix**:

```bash
# Check PostgreSQL is running
pg_isready

# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Or start manually
postgres -D /usr/local/var/postgres
```

### Google OAuth error

**Error**: `redirect_uri_mismatch`

**Fix**: Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs in Google Cloud Console

### Email not sending

**Error**: `Invalid login` or `Authentication failed`

**Fix**:

1. Use Gmail App Password (not regular password)
2. Enable "Less secure app access" if not using 2FA
3. Check SMTP settings are correct

### File upload fails

**Error**: `Failed to upload file`

**Fix**:

1. For development, you can use local storage or free S3 alternatives:
   - [MinIO](https://min.io) (local S3-compatible)
   - [Cloudflare R2](https://cloudflare.com/products/r2/) (generous free tier)
2. Update S3 credentials in `.env.local`

### Port 3000 already in use

**Fix**:

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

---

## 📁 Project Structure Quick Reference

```
alx-partnership-app/
├── app/                    # Next.js pages and API routes
│   ├── page.tsx           # Landing page
│   ├── api/               # Backend API
│   └── (dashboard)/       # Protected pages
├── lib/                   # Core services
│   ├── db/                # Database client
│   ├── email/             # Email service + templates
│   ├── storage/           # File storage
│   └── validation/        # Form schemas
├── prisma/                # Database schema & migrations
├── components/            # React components (to be added)
└── public/                # Static files
```

---

## 🎯 Next Steps

1. **Read the docs**:

   - `README.md` - Overview
   - `IMPLEMENTATION_GUIDE.md` - Complete code samples
   - `API_DOCUMENTATION.md` - API endpoints
   - `PROJECT_SUMMARY.md` - Full project details

2. **Add UI components**:

   ```bash
   # Install shadcn/ui
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button input dialog toast
   ```

3. **Implement pages**:

   - See `IMPLEMENTATION_GUIDE.md` for complete code
   - `/app/apply/page.tsx` - Intake form
   - `/app/dashboard/page.tsx` - Request queue
   - `/app/calendar/page.tsx` - Event calendar

4. **Run tests**:

   ```bash
   npm test
   npm run test:e2e
   ```

5. **Deploy to production**:
   - See deployment section in `README.md`
   - Configure production environment variables
   - Set up CI/CD pipeline

---

## 🆘 Getting Help

**Documentation**:

- 📖 Full README: `README.md`
- 🔧 Implementation Guide: `IMPLEMENTATION_GUIDE.md`
- 📊 API Docs: `API_DOCUMENTATION.md`

**Common Commands**:

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run prisma:studio  # Open database viewer
```

**Database Commands**:

```bash
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npx prisma studio        # Visual database browser
```

---

## 🎉 Success!

You should now have:

- ✅ App running on http://localhost:3000
- ✅ Database with test data
- ✅ Email notifications working
- ✅ OAuth authentication configured
- ✅ File uploads functional

**Time to build**: ~10 minutes  
**Status**: Ready for development

Happy coding! 🚀
