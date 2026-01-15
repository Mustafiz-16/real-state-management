# Environment Variables Fix

## Problem

Environment variables were not loading in the backend because `dotenv.config()` was being called **after** the modules that needed those variables were imported.

## Root Cause

In ES modules (type: "module"), when you import a file, all its code executes immediately. So when `server.js` imported `app.js`, the code in `app.js` ran before `dotenv.config()` was called in `server.js`.

## Solution Applied

### 1. Load dotenv FIRST in server.js

```javascript
// BEFORE (Wrong order):
import app from "./app.js"; // This runs app.js code
import dotenv from "dotenv";
dotenv.config(); // Too late!

// AFTER (Correct order):
import dotenv from "dotenv";
dotenv.config(); // Load env vars FIRST
import app from "./app.js"; // Now app.js has access to env vars
```

### 2. Removed duplicate dotenv.config() from app.js

Since `server.js` now loads environment variables before importing `app.js`, we don't need to load them again in `app.js`.

### 3. Added startup verification

The server now logs which environment variables are loaded on startup:

```
Server running on port 5000
Frontend URL: http://localhost:5173
MongoDB: ✅ Connected
JWT Secret: ✅ Configured
```

## How to Verify

### Option 1: Run the test script

```bash
cd server
node test-env.js
```

You should see:

```
✅ PORT: 5000
✅ MONGO_URI: ***hidden***
✅ JWT_SECRET: ***hidden***
✅ FRONTEND_URL: http://localhost:5173
```

### Option 2: Start the server

```bash
cd server
npm start
```

Check the console output - you should see the environment verification logs.

### Option 3: Check in your code

Add this anywhere in your backend code to test:

```javascript
console.log("ENV TEST:", {
  port: process.env.PORT,
  frontend: process.env.FRONTEND_URL,
  hasMongoURI: !!process.env.MONGO_URI,
  hasJWTSecret: !!process.env.JWT_SECRET,
});
```

## Common Issues & Solutions

### Still not working?

1. **Restart your server** - Changes to .env or loading order require a restart

   ```bash
   # Stop the server (Ctrl+C) and restart
   npm start
   ```

2. **Check .env file location** - Must be in `/server/.env`

   ```bash
   ls -la server/.env  # Should exist
   ```

3. **Check .env syntax** - No spaces around `=` signs

   ```bash
   # ❌ Wrong:
   PORT = 5000

   # ✅ Correct:
   PORT=5000
   ```

4. **No quotes needed** in .env (unless value has spaces)

   ```bash
   # Both work:
   FRONTEND_URL=http://localhost:5173
   FRONTEND_URL="http://localhost:5173"
   ```

5. **Check file permissions**
   ```bash
   chmod 644 server/.env
   ```

## Files Modified

- ✅ `/server/server.js` - Moved dotenv.config() to top
- ✅ `/server/app.js` - Removed duplicate dotenv.config()
- ✅ `/server/test-env.js` - Created test script

## Testing Checklist

- [ ] Run `node test-env.js` - all variables show ✅
- [ ] Start server - see verification logs
- [ ] MongoDB connects successfully
- [ ] JWT authentication works
- [ ] CORS works with correct FRONTEND_URL
- [ ] No "undefined" in logs for env variables

## Pro Tip

If you add new environment variables:

1. Add to `.env`
2. Add to `.env.example` (for documentation)
3. Restart your server
4. Run `node test-env.js` to verify
