#!/bin/bash

# ALX Partnership App - Free Services Setup
# This script guides you through setting up 100% FREE services

set -e

echo "🎁 ALX Partnership - FREE Services Setup"
echo "========================================"
echo ""
echo "This will help you setup completely FREE services:"
echo "  ✅ Supabase (Database) - FREE 500MB"
echo "  ✅ Resend (Email) - FREE 3,000 emails/month"
echo "  ✅ Cloudflare R2 (Storage) - FREE 10GB + unlimited bandwidth"
echo "  ✅ Vercel (Hosting) - FREE 100GB bandwidth"
echo ""
echo "Total Monthly Cost: $0"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists. Backup created as .env.local.backup${NC}"
    cp .env.local .env.local.backup
fi

echo ""
echo "=========================================="
echo "Step 1: Supabase Database (FREE)"
echo "=========================================="
echo ""
echo "1. Go to https://supabase.com"
echo "2. Click 'Start your project' (FREE, no credit card)"
echo "3. Create new organization and project"
echo "4. Go to Settings → Database"
echo "5. Copy the Connection String"
echo ""
read -p "Paste your Supabase DATABASE_URL: " SUPABASE_URL
read -p "Paste your Supabase DIRECT_URL: " SUPABASE_DIRECT_URL

echo ""
echo "=========================================="
echo "Step 2: Resend Email (FREE)"
echo "=========================================="
echo ""
echo "1. Go to https://resend.com"
echo "2. Sign up (FREE, no credit card needed)"
echo "3. Click 'API Keys'"
echo "4. Create new API key"
echo "5. Copy the key (starts with 're_')"
echo ""
read -p "Paste your Resend API Key: " RESEND_KEY
read -p "Enter your FROM email (e.g., partnerships@yourdomain.com): " FROM_EMAIL

echo ""
echo "=========================================="
echo "Step 3: Cloudflare R2 Storage (FREE)"
echo "=========================================="
echo ""
echo "1. Go to https://cloudflare.com"
echo "2. Sign up for Cloudflare account"
echo "3. Go to R2 Object Storage"
echo "4. Create bucket: alx-partnership-files"
echo "5. Create API token with R2 edit permissions"
echo ""
read -p "Paste your R2 Account ID: " R2_ACCOUNT
read -p "Paste your R2 Access Key ID: " R2_ACCESS_KEY
read -p "Paste your R2 Secret Access Key: " R2_SECRET_KEY
read -p "Paste your R2 Public URL (optional, press Enter to skip): " R2_PUBLIC_URL

echo ""
echo "=========================================="
echo "Step 4: Google OAuth (FREE)"
echo "=========================================="
echo ""
echo "1. Go to https://console.cloud.google.com"
echo "2. Create new project"
echo "3. Enable Google+ API"
echo "4. Create OAuth 2.0 Client ID (Web application)"
echo "5. Add authorized redirect URI:"
echo "   http://localhost:3000/api/auth/callback/google"
echo ""
read -p "Paste your Google Client ID: " GOOGLE_CLIENT_ID
read -p "Paste your Google Client Secret: " GOOGLE_CLIENT_SECRET
read -p "Enter authorized domain (e.g., alxafrica.com): " GOOGLE_DOMAIN

echo ""
echo "=========================================="
echo "Step 5: NextAuth Secret"
echo "=========================================="
echo ""
echo "Generating secure NextAuth secret..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo -e "${GREEN}✅ Secret generated!${NC}"

echo ""
echo "=========================================="
echo "Creating .env.local file..."
echo "=========================================="

cat > .env.local <<EOF
# ============================================
# FREE SERVICES CONFIGURATION
# Total Cost: \$0/month
# ============================================

# Database - Supabase (FREE: 500MB)
DATABASE_URL="${SUPABASE_URL}"
DIRECT_URL="${SUPABASE_DIRECT_URL}"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"

# Google OAuth (FREE)
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET}"
GOOGLE_AUTHORIZED_DOMAIN="${GOOGLE_DOMAIN}"

# Email - Resend (FREE: 3,000 emails/month)
EMAIL_PROVIDER="resend"
RESEND_API_KEY="${RESEND_KEY}"
EMAIL_FROM="${FROM_EMAIL}"
EMAIL_ADMIN_CC="admin@alxafrica.com"

# File Storage - Cloudflare R2 (FREE: 10GB)
STORAGE_PROVIDER="r2"
R2_ACCOUNT_ID="${R2_ACCOUNT}"
R2_ACCESS_KEY_ID="${R2_ACCESS_KEY}"
R2_SECRET_ACCESS_KEY="${R2_SECRET_KEY}"
R2_BUCKET_NAME="alx-partnership-files"
R2_PUBLIC_URL="${R2_PUBLIC_URL}"

# Application Settings
APP_URL="http://localhost:3000"
NODE_ENV="development"
APP_NAME="ALX Partnership"

# Business Rules
BUSINESS_DAYS_ADVANCE=15
MAX_FILE_SIZE_MB=5
EOF

echo -e "${GREEN}✅ .env.local created successfully!${NC}"
echo ""

echo "=========================================="
echo "Installing FREE service packages..."
echo "=========================================="
echo ""

npm install resend --legacy-peer-deps

echo ""
echo -e "${GREEN}✅ Packages installed!${NC}"
echo ""

echo "=========================================="
echo "Setting up database..."
echo "=========================================="
echo ""

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

echo ""
echo -e "${GREEN}=========================================="
echo "✅ FREE SERVICES SETUP COMPLETE!"
echo "==========================================${NC}"
echo ""
echo "📊 Your Free Stack:"
echo "  ✅ Supabase Database - 500MB"
echo "  ✅ Resend Email - 3,000/month"
echo "  ✅ Cloudflare R2 - 10GB storage"
echo "  ✅ Google OAuth - Unlimited"
echo "  💰 Total Cost: \$0/month"
echo ""
echo "🚀 Next Steps:"
echo "  1. Run: npm run dev"
echo "  2. Visit: http://localhost:3000"
echo "  3. Test the application"
echo ""
echo "📚 Documentation:"
echo "  - FREE_DEPLOYMENT_GUIDE.md - Complete guide"
echo "  - START_HERE.md - Quick start"
echo ""
echo "🎉 Ready to launch your app for FREE!"
