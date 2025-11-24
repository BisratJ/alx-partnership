# ALX Partnership Management System

A production-ready web application for managing ALX partnerships, featuring automated intake, workflow management, conflict-free calendar scheduling, and team collaboration.

## 🎯 Key Features

- **Validated Intake Form**: Public-facing form with 15-business-day enforcement, file uploads, and instant validation
- **Role-Based Dashboard**: Multi-column workflow board for Admins, Reviewers, Team Members, and Schedulers
- **Conflict-Free Calendar**: Smart scheduling with hub availability rules, timezone awareness, and collision detection
- **Automated Notifications**: Email templates for submissions, assignments, status changes, and calendar updates
- **Google OAuth Integration**: Secure SSO for internal staff
- **Audit Trail**: Complete history of all changes with user attribution
- **Mobile-First**: Responsive design optimized for all devices

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with full-text search and JSONB support
- **Authentication**: NextAuth.js with Google OAuth 2.0
- **Storage**: S3-compatible file storage with malware scanning
- **Email**: Nodemailer with Handlebars templates
- **Calendar**: FullCalendar with custom conflict detection
- **Testing**: Jest, React Testing Library, Playwright

### Security Features

- ✅ TLS 1.3 encryption in transit
- ✅ AES-256 encryption at rest
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection with content sanitization
- ✅ CSRF tokens on all forms
- ✅ Rate limiting (5 submissions/hour per IP)
- ✅ File upload validation and malware scanning
- ✅ Role-based access control (RBAC)
- ✅ Comprehensive audit logging

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14
- Google Cloud Project (for OAuth)
- SMTP server or email service credentials
- S3-compatible storage (AWS S3, MinIO, etc.)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd "/Users/bisratgizaw/Downloads/ALX Partnership"
npm install
```

### 2. Environment Configuration

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/alx_partnership?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_AUTHORIZED_DOMAIN="alxafrica.com"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="notifications@alxafrica.com"
SMTP_PASSWORD="your-smtp-password"
EMAIL_FROM="ALX Partnership <partnerships@alxafrica.com>"

# File Storage (S3)
S3_ENDPOINT="https://s3.amazonaws.com"
S3_REGION="us-east-1"
S3_BUCKET="alx-partnership-files"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"

# Application
APP_URL="http://localhost:3000"
BUSINESS_DAYS_ADVANCE=15
MAX_FILE_SIZE_MB=5
RATE_LIMIT_SUBMISSIONS_PER_HOUR=5

# Monitoring (Optional)
SENTRY_DSN=""
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed initial data (hubs, test users)
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
alx-partnership-app/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes (no auth)
│   │   ├── page.tsx            # Landing page
│   │   └── apply/              # Intake form
│   ├── (dashboard)/            # Protected routes
│   │   ├── dashboard/          # Main dashboard
│   │   ├── calendar/           # Event calendar
│   │   ├── requests/           # Request detail views
│   │   └── admin/              # Admin settings
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth
│   │   ├── v1/                # Versioned API
│   │   └── webhooks/          # External integrations
│   └── layout.tsx             # Root layout
├── components/                 # React components
│   ├── ui/                    # shadcn/ui components
│   ├── forms/                 # Form components
│   ├── dashboard/             # Dashboard widgets
│   └── calendar/              # Calendar components
├── lib/                       # Utilities
│   ├── db/                    # Database utilities
│   ├── email/                 # Email service
│   ├── storage/               # File storage
│   ├── validation/            # Zod schemas
│   └── utils.ts               # Helpers
├── prisma/                    # Database
│   ├── schema.prisma          # Schema definition
│   ├── migrations/            # Migration history
│   └── seed.ts                # Seed script
├── scripts/                   # Utilities
│   └── migrate-google-sheets.ts
├── tests/                     # Test suites
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── public/                    # Static assets
```

## 🔐 User Roles & Permissions

| Role                 | Capabilities                                       |
| -------------------- | -------------------------------------------------- |
| **External Partner** | Submit intake form, view submission status         |
| **Reviewer**         | View queue, approve/reject, assign, comment        |
| **Team Member**      | Update assigned requests, propose calendar slots   |
| **Calendar Manager** | Manage calendar, resolve conflicts, approve events |
| **Admin**            | Full CRUD, user management, system configuration   |

## 🧪 Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

### Test Coverage

- ✅ Form validation (15-day rule, email format, file types)
- ✅ Calendar conflict detection algorithm
- ✅ Business logic (MOU flag when >10 events)
- ✅ API authentication and authorization
- ✅ Email notification triggers
- ✅ Full user workflows (submit → review → schedule)

## 📊 Monitoring & Metrics

### Key Performance Indicators

- Dashboard load time < 2 seconds
- API response time < 500ms (p95)
- Calendar conflict check < 100ms
- Email delivery within 60 seconds
- 99.9% uptime target

### Health Checks

- `GET /api/health` - System health
- `GET /api/health/db` - Database connectivity
- `GET /api/health/storage` - File storage status

## 📤 Deployment

### Docker

```bash
docker build -t alx-partnership .
docker run -p 3000:3000 --env-file .env.production alx-partnership
```

### Environment Variables (Production)

Update `.env.production` with production values and ensure:

- Strong `NEXTAUTH_SECRET`
- Production database URL
- HTTPS-only cookies enabled
- Rate limiting configured
- Monitoring enabled

### Database Backups

Automated daily backups recommended:

- Retention: 90 days
- Point-in-time recovery enabled
- Encrypted backup storage

## 🔄 Migration from Google Sheets

```bash
# Export your Google Sheet as CSV
# Place it in /scripts/data.csv
npm run migrate:sheets
```

See `scripts/migrate-google-sheets.ts` for mapping configuration.

## 📧 Email Templates

Located in `/lib/email/templates/`:

- `submission-receipt.hbs` - Partner confirmation
- `assignment-created.hbs` - Staff assignment
- `status-changed.hbs` - Status updates
- `calendar-confirmed.hbs` - Event confirmation

Edit templates directly or via Admin UI.

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql -U your_user -d alx_partnership -c "SELECT 1;"

# Reset database
npm run prisma:migrate reset
```

### File Upload Failures

- Verify S3 credentials in `.env.local`
- Check bucket permissions (write access required)
- Ensure max file size is configured

### Email Not Sending

- Test SMTP connection manually
- Check firewall rules (port 587/465)
- Verify sender email is authorized

## 📝 License

Proprietary - ALX Africa © 2025

## 👥 Support

For technical issues: dev-team@alxafrica.com  
For partnership inquiries: partnerships@alxafrica.com

---

**Built with ❤️ by the ALX Engineering Team**
