#!/bin/bash

# CORS Test Script
# Run this after starting both servers

echo "🧪 Testing CORS Configuration..."
echo ""

# Check if backend is running
echo "📡 Checking backend (port 5000)..."
if curl -s http://localhost:5000/ > /dev/null; then
    echo "✅ Backend is running on port 5000"
else
    echo "❌ Backend is NOT running on port 5000"
    echo "   Run: cd server && npm start"
    exit 1
fi

# Check if frontend is running
echo ""
echo "📡 Checking frontend (port 5173)..."
if curl -s http://localhost:5173/ > /dev/null; then
    echo "✅ Frontend is running on port 5173"
else
    echo "❌ Frontend is NOT running on port 5173"
    echo "   Run: cd client && npm run dev"
    exit 1
fi

# Test CORS headers
echo ""
echo "🔍 Testing CORS headers..."
CORS_HEADERS=$(curl -s -I -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  http://localhost:5000/api/auth/login)

if echo "$CORS_HEADERS" | grep -q "access-control-allow-origin"; then
    echo "✅ CORS headers present"
    echo "$CORS_HEADERS" | grep -i "access-control"
else
    echo "❌ CORS headers missing"
    echo "   Make sure server is running with CORS enabled"
    exit 1
fi

echo ""
echo "🎉 All tests passed! CORS is configured correctly."
echo ""
echo "Next steps:"
echo "1. Open http://localhost:5173 in your browser"
echo "2. Open Developer Tools (F12)"
echo "3. Check Console for any errors"
echo "4. Try logging in or signing up"
