#!/bin/bash

# Setup script for Wallet Service

set -e  # Exit on error

echo "Setting up Wallet Service..."

# Check for package manager
if command -v bun &> /dev/null; then
    PM="bun"
elif command -v pnpm &> /dev/null; then
    PM="pnpm"
elif command -v yarn &> /dev/null; then
    PM="yarn"
elif command -v npm &> /dev/null; then
    PM="npm"
else
    echo "❌ No package manager found. Please install bun, pnpm, yarn, or npm."
    exit 1
fi

# Install dependencies
echo "Installing dependencies with $PM..."
$PM install

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one with DATABASE_URL (e.g., DATABASE_URL=postgresql://user:pass@localhost:5432/wallet_db)"
    exit 1
fi

# DB setup
echo "🗄️  Setting up database..."
$PM run db:generate
$PM run db:migrate
$PM run db:seed

echo "✅ Setup complete! Run '$PM run dev' to start the app."
