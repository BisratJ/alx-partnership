# 🧪 Local Testing Guide - ALX Partnership App

## ✅ Setup Complete!

Your app is now running locally at: **http://localhost:3000**

---

## 🎯 What's Working

### ✅ Database

- PostgreSQL database: `alx_partnership`
- 11 tables created and seeded
- 3 hubs (CapStone, CityPoint, Virtual)
- 1 admin user
- 1 test partner
- 1 sample request

### ✅ Frontend

- Landing page with modern UI
- Professional design and navigation
- Responsive layout (mobile-friendly)
- Feature showcase

### ✅ Backend

- Next.js 14 server running
- Database connections working
- Prisma ORM configured

---

## 🧪 Manual Testing Checklist

### Test 1: Landing Page ✅

**URL**: http://localhost:3000

**What to Test**:

- [ ] Page loads without errors
- [ ] Navigation bar displays
- [ ] "Apply for Partnership" button visible
- [ ] "Staff Login" button visible
- [ ] Features grid displays (6 cards)
- [ ] Stats section shows (500+, 3, 24/7, 100%)
- [ ] Footer displays with links
- [ ] Mobile responsive (resize browser)

**Expected Result**: Clean, professional landing page

---

### Test 2: Partnership Application Form

**URL**: http://localhost:3000/apply

**Status**: ⚠️ **Page needs to be created**

**To Complete**:

1. Copy code from `FINAL_BUILD_GUIDE.md`
2. Create `app/apply/page.tsx`
3. Test form submission

**What to Test When Ready**:

- [ ] All 15 form fields display
- [ ] Validation triggers on empty fields
- [ ] Date picker enforces 15-day rule
- [ ] File upload accepts PDF (concept note)
- [ ] File upload accepts PNG/JPEG (logo)
- [ ] Submit button disables during submission
- [ ] Success message shows after submission
- [ ] Email confirmation sent

---

### Test 3: API Health Check ✅

**URL**: http://localhost:3000/api/health

**How to Test**:

```bash
curl http://localhost:3000/api/health
```

**Expected Response**:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-24T...",
  "version": "1.0.0"
}
```

---

### Test 4: Database Connection ✅

**Check with Prisma Studio**:

```bash
npx prisma studio
```

**What to Test**:

- [ ] Opens at http://localhost:5555
- [ ] Can view all 11 tables
- [ ] Can see seeded data:
  - 3 Hubs
  - 1 User (admin@alxafrica.com)
  - 1 Partner (partner@example.com)
  - 1 Request (Sample Tech Workshop)
  - 1 SystemConfig entry

---

### Test 5: Form Submission (When Form is Built)

**Test Case 1: Valid Submission**

```
Organization: Tech Innovators Ltd
POC Name: John Smith
POC Email: john@techinnovators.com
Phone: +254712345678
Event Title: Tech Workshop
Event Date: [30 days from today]
Start Time: 14:00
End Time: 17:00
Target Hub: CAPSTONE
Attendee Count: 50
```

**Expected**:

- ✅ Form submits successfully
- ✅ Success message displays
- ✅ Request ID shown
- ✅ Database has new record
- ✅ Email sent (check logs)

**Test Case 2: Invalid Date (< 15 days)**

```
Event Date: [10 days from today]
```

**Expected**:

- ❌ Validation error
- ❌ "Event must be at least 15 business days in advance"

**Test Case 3: Invalid Time**

```
Start Time: 08:00 (before hub opens)
```

**Expected**:

- ❌ Validation error
- ❌ "Hub operating hours are 09:00-20:00"

**Test Case 4: Large File**

```
Concept Note: 10MB PDF
```

**Expected**:

- ❌ Validation error
- ❌ "File must be less than 5MB"

---

### Test 6: Rate Limiting

**Test**: Submit form 6 times rapidly

**Expected**:

- First 5 submissions: ✅ Success
- 6th submission: ❌ "Too many submissions. Please try again in an hour"

---

### Test 7: Google OAuth (When Configured)

**URL**: http://localhost:3000/dashboard

**Setup Required**:

1. Create Google OAuth credentials
2. Add to `.env.local`
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`

**Expected**:

- Redirects to Google login
- Domain restriction works (@alxafrica.com only)
- After login, creates/updates user in database

---

## 📊 Database Verification

### Check Seeded Data

```bash
# Connect to database
psql postgresql://postgres:postgres@localhost:5432/alx_partnership

# Check hubs
SELECT id, name, "openTime", "closeTime" FROM hubs;

# Check users
SELECT id, email, "fullName", role FROM users;

# Check partners
SELECT id, "orgName", "pocEmail" FROM partners;

# Check requests
SELECT id, "eventTitle", status, "requestedDate" FROM requests;
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Issue 2: Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
brew services restart postgresql

# Verify connection
psql -U postgres -d alx_partnership -c "SELECT 1;"
```

### Issue 3: Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue 4: Prisma Client Not Generated

```bash
# Regenerate Prisma client
npm run prisma:generate
```

### Issue 5: Migration Errors

```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate reset

# Or drop and recreate
dropdb alx_partnership
createdb alx_partnership
npm run prisma:migrate
npm run prisma:seed
```

---

## 🔍 Monitoring & Logs

### View Server Logs

Watch the terminal where `npm run dev` is running

### View Database Logs

```bash
# PostgreSQL logs (macOS)
tail -f /usr/local/var/log/postgres.log
```

### Check API Requests

Every API call is logged in the terminal:

```
GET / 200 in 49ms
POST /api/v1/public/submit 201 in 1234ms
```

---

## 📝 Test Data Reference

### Seeded Hubs

| ID     | Name      | Hours       |
| ------ | --------- | ----------- |
| [UUID] | CAPSTONE  | 09:00-20:00 |
| [UUID] | CITYPOINT | 09:00-20:00 |
| [UUID] | VIRTUAL   | 00:00-23:59 |

### Seeded Users

| Email               | Role  |
| ------------------- | ----- |
| admin@alxafrica.com | ADMIN |

### Seeded Partners

| Organization      | Email               |
| ----------------- | ------------------- |
| Test Organization | partner@example.com |

### Seeded Requests

| Title                | Status | Date              |
| -------------------- | ------ | ----------------- |
| Sample Tech Workshop | NEW    | 30 days from seed |

---

## ✅ Production Readiness Checklist

Before deploying to production:

### Security

- [ ] Change `NEXTAUTH_SECRET` to strong random value
- [ ] Configure Google OAuth with production domain
- [ ] Set up SMTP/Resend for emails
- [ ] Configure Cloudflare R2 for file storage
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Review rate limits (currently 5/hour)

### Database

- [ ] Use production PostgreSQL (Supabase recommended)
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Review indexes for performance

### Monitoring

- [ ] Set up Sentry for error tracking
- [ ] Configure Vercel Analytics
- [ ] Set up uptime monitoring
- [ ] Configure alert notifications

### Testing

- [ ] Run full test suite
- [ ] Perform UAT with stakeholders
- [ ] Test on mobile devices
- [ ] Test email delivery
- [ ] Test file uploads/downloads

---

## 🚀 Next Steps

### Immediate (Complete Form)

1. Create `app/apply/page.tsx` from `FINAL_BUILD_GUIDE.md`
2. Test form submission locally
3. Verify email notifications
4. Test file uploads

### Short-term (Build Dashboard)

1. Create `app/dashboard/page.tsx`
2. Add authentication check
3. Display requests list
4. Add status filters

### Medium-term (Add Calendar)

1. Install FullCalendar
2. Create `app/calendar/page.tsx`
3. Implement conflict detection
4. Add event creation

### Long-term (Deploy)

1. Follow `FREE_DEPLOYMENT_GUIDE.md`
2. Set up Supabase database
3. Configure Resend email
4. Deploy to Vercel
5. Test in production

---

## 📚 Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npm run prisma:studio         # Open database GUI
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Run migrations
npm run prisma:seed          # Seed database

# Testing
npm test                      # Run tests
npm run lint                  # Check code quality

# Cleanup
npm run prisma:migrate reset  # Reset database
rm -rf .next                  # Clear Next.js cache
```

---

## 🎯 Success Criteria

Your local setup is successful if:

✅ Server starts without errors  
✅ Landing page loads at http://localhost:3000  
✅ Database connection works (Prisma Studio)  
✅ Seeded data visible in database  
✅ No TypeScript errors in IDE  
✅ API health check returns 200

---

## 📞 Getting Help

**Documentation**:

- `START_HERE.md` - Quick setup
- `FINAL_BUILD_GUIDE.md` - Complete code samples
- `FREE_DEPLOYMENT_GUIDE.md` - Production deployment

**Common Resources**:

- Next.js: https://nextjs.org/docs
- Prisma: https://prisma.io/docs
- Tailwind: https://tailwindcss.com/docs

---

**Status**: ✅ **Local Environment Ready for Testing**  
**Next**: Complete the application form page and test end-to-end!
