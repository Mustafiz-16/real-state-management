#!/bin/bash

# Property Management System - Development Setup Script

echo "🚀 Starting Property Management System Setup..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Server .env file not found. Creating from .env.example..."
    cp server/.env.example server/.env
    echo "⚠️  Please update server/.env with your actual configuration"
fi

if [ ! -f "client/.env" ]; then
    echo "Creating client .env from .env.example..."
    cp client/.env.example client/.env
fi

# Install dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update server/.env with your MongoDB URI and JWT secret"
echo "2. Start the backend: cd server && npm start"
echo "3. Start the frontend: cd client && npm run dev"
echo ""
echo "Server will run on: http://localhost:5000"
echo "Client will run on: http://localhost:5173"
