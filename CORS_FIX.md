# CORS Fix Applied - Testing Guide

## Changes Made

### Backend (Server)

1. **Enhanced CORS Configuration in `app.js`:**

   - Added explicit HTTP methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
   - Added allowed headers: Content-Type, Authorization
   - Added OPTIONS preflight handling for all routes
   - Set maxAge for preflight caching (24 hours)
   - Added fallback to localhost:5173 if FRONTEND_URL is not set

2. **Updated Socket.io CORS in `server.js`:**
   - Aligned with Express CORS settings
   - Added fallback URL
   - Added dotenv.config() at the top to ensure env vars load first

### Frontend (Client)

3. **Enhanced Axios Configuration in `axios.js`:**

   - Added default Content-Type header
   - Added fallback backend URL
   - Added response interceptor to handle 401 errors automatically
   - Improved error handling

4. **Updated Socket.io Client in `socket.js`:**
   - Uses environment variable for backend URL
   - Added withCredentials: true
   - Added both websocket and polling transports
   - Added reconnection settings

## How to Test

### 1. Start Both Servers

**Terminal 1 (Backend):**

```bash
cd server
npm start
```

**Terminal 2 (Frontend):**

```bash
cd client
npm run dev
```

### 2. Check Console for Errors

Open browser console (F12) and look for:

- ❌ CORS errors (should be GONE now)
- ✅ Successful API requests
- ✅ Socket connection established

### 3. Test API Requests

Open browser console on `http://localhost:5173` and run:

```javascript
// Test 1: Simple GET request
fetch("http://localhost:5000/", { credentials: "include" })
  .then((r) => r.text())
  .then(console.log)
  .catch(console.error);

// Test 2: API POST request
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@test.com", password: "test123" }),
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);
```

### 4. Test Socket.io Connection

In browser console:

```javascript
// Check socket connection
import socket from "./src/utils/socket.js";
console.log("Socket connected:", socket.connected);
```

## Verify Environment Variables

### Backend `.env` should have:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env` should have:

```
VITE_BACKEND_URL=http://localhost:5000/api
```

## Common CORS Errors and Solutions

### Error: "No 'Access-Control-Allow-Origin' header"

**Solution:** ✅ FIXED - Enhanced CORS configuration now includes proper origin

### Error: "CORS policy: Credentials flag is 'true'"

**Solution:** ✅ FIXED - Both frontend and backend now use credentials: true

### Error: "Method not allowed"

**Solution:** ✅ FIXED - Added OPTIONS handler and all HTTP methods

### Error: "Header not allowed"

**Solution:** ✅ FIXED - Added Authorization and Content-Type to allowed headers

## Testing Checklist

- [ ] Backend starts without errors on port 5000
- [ ] Frontend starts without errors on port 5173
- [ ] Browser console shows no CORS errors
- [ ] Can open http://localhost:5173 without issues
- [ ] Can send API requests from frontend to backend
- [ ] Socket.io connection establishes successfully
- [ ] Login/signup works without CORS errors
- [ ] Token is sent with requests (check Network tab)

## Debug Mode

If you still see CORS errors:

1. **Check actual URLs:**

   ```bash
   # Backend
   echo $FRONTEND_URL

   # Should output: http://localhost:5173
   ```

2. **Restart both servers** (important after .env changes)

3. **Clear browser cache and localStorage:**

   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

4. **Check browser Network tab:**

   - Look for OPTIONS request (preflight)
   - Check Response Headers for CORS headers
   - Verify Status is 200 or 204 for OPTIONS

5. **Enable CORS debug mode:**
   Add to server app.js temporarily:
   ```javascript
   app.use((req, res, next) => {
     console.log("Request from:", req.headers.origin);
     console.log("Method:", req.method);
     next();
   });
   ```

## Production Deployment

When deploying to production, update:

**Backend `.env`:**

```
FRONTEND_URL=https://yourdomain.com
```

**Frontend `.env`:**

```
VITE_BACKEND_URL=https://api.yourdomain.com/api
```

And consider using environment-specific CORS:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://yourdomain.com",
  "https://www.yourdomain.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  // ... rest of config
};
```

## Success Indicators

✅ **You'll know CORS is fixed when:**

1. No red errors in browser console
2. API requests complete successfully
3. Network tab shows proper CORS headers:
   - `access-control-allow-origin: http://localhost:5173`
   - `access-control-allow-credentials: true`
   - `access-control-allow-methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`
4. Socket.io connects without errors
5. Login/signup flows work end-to-end

## Need More Help?

If CORS errors persist:

1. Check that both servers are running
2. Verify .env files have correct URLs (no trailing slashes)
3. Restart both servers
4. Clear browser cache
5. Try in incognito mode
6. Check for typos in URLs
7. Ensure ports 5000 and 5173 are not blocked by firewall
