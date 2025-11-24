#!/bin/bash

# ALX Partnership App - Quick Setup Script
# This script automates the initial setup process

set -e

echo "🚀 ALX Partnership App - Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 18${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be >= 18 (current: $(node -v))${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL CLI not found. Make sure PostgreSQL server is running.${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL found${NC}"
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""

# Setup environment file
if [ ! -f .env.local ]; then
    echo "⚙️  Creating environment file..."
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Please edit .env.local with your configuration${NC}"
    echo ""
    
    # Prompt for basic config
    read -p "Enter database URL (or press Enter to skip): " DB_URL
    if [ ! -z "$DB_URL" ]; then
        sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env.local
    fi
    
    read -p "Enter Google Client ID (or press Enter to skip): " GOOGLE_ID
    if [ ! -z "$GOOGLE_ID" ]; then
        sed -i.bak "s|GOOGLE_CLIENT_ID=.*|GOOGLE_CLIENT_ID=\"$GOOGLE_ID\"|" .env.local
    fi
    
    # Generate NextAuth secret
    echo "🔐 Generating NextAuth secret..."
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$NEXTAUTH_SECRET\"|" .env.local
    
    # Clean up backup files
    rm -f .env.local.bak
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi

echo ""

# Setup database
read -p "Do you want to setup the database now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Generating Prisma client..."
    npm run prisma:generate
    
    echo "🗄️  Running database migrations..."
    npm run prisma:migrate
    
    echo "🌱 Seeding database..."
    npm run prisma:seed
    
    echo -e "${GREEN}✅ Database setup complete${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping database setup. Run 'npm run prisma:migrate' manually later.${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your credentials"
echo "  2. Run 'npm run dev' to start development server"
echo "  3. Visit http://localhost:3000"
echo ""
echo "Documentation:"
echo "  - README.md - Overview and quick start"
echo "  - IMPLEMENTATION_GUIDE.md - Complete code samples"
echo "  - PROJECT_SUMMARY.md - Comprehensive project details"
echo ""
echo "Happy coding! 🎉"
