# Property Management System - Known Issues & Solutions

## Common Issues

### 1. MongoDB Connection Error

**Error**: "MongoDB Connection Error"
**Solution**:

- Check if your MongoDB URI is correct in `server/.env`
- Ensure your IP is whitelisted in MongoDB Atlas (if using Atlas)
- Verify network connection

### 2. CORS Errors

**Error**: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution**:

- Ensure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Default is `http://localhost:5173`
- Don't include trailing slashes

### 3. JWT Token Issues

**Error**: "Invalid or expired token"
**Solution**:

- Clear localStorage in browser (Application > Local Storage > Clear)
- Login again
- Check if `JWT_SECRET` is set in `server/.env`

### 4. File Upload Errors

**Error**: "File upload failed"
**Solution**:

- Ensure `uploads/` folder exists in server directory
- Check file permissions: `chmod 755 server/uploads`
- Verify file size and type restrictions in `middleware/upload.middleware.js`

### 5. Port Already in Use

**Error**: "Port 5000 is already in use"
**Solution**:

```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### 6. Missing Dependencies

**Error**: "Cannot find module 'xyz'"
**Solution**:

```bash
cd server && npm install
cd ../client && npm install
```

## Development Tips

### Hot Reload Not Working

- Restart both servers
- Clear browser cache
- Check if nodemon is installed: `npm install -D nodemon`

### Database Connection Slow

- Use a closer MongoDB region
- Consider local MongoDB for development
- Check internet connection

### Socket.io Not Connecting

- Verify `FRONTEND_URL` in server `.env`
- Check browser console for socket errors
- Ensure both servers are running

## Best Practices

1. **Never commit `.env` files** - They contain sensitive information
2. **Always use environment variables** - Never hardcode credentials
3. **Test in incognito mode** - To rule out cache issues
4. **Keep dependencies updated** - Run `npm outdated` regularly
5. **Use proper error handling** - All async operations should have try-catch

## Security Checklist

- [ ] `.env` files in `.gitignore`
- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] File upload restrictions in place
- [ ] MongoDB connection string secure
- [ ] Rate limiting configured (TODO)
- [ ] HTTPS in production (TODO)

## Performance Tips

1. Add indexes to frequently queried fields (already done for main models)
2. Use pagination for large data sets
3. Implement caching for static data
4. Optimize images before upload
5. Use CDN for static assets in production

## Testing Checklist

### Authentication

- [ ] User can sign up
- [ ] User can log in
- [ ] Token persists on refresh
- [ ] Logout clears token
- [ ] Role-based redirects work

### Properties

- [ ] Owner can create property
- [ ] Admin can approve/reject
- [ ] Buyer can view approved properties
- [ ] Images upload correctly
- [ ] Documents upload correctly

### Messaging

- [ ] Conversations created
- [ ] Messages send in real-time
- [ ] Socket connection stable
- [ ] Message history loads

## Contact Support

If you encounter issues not listed here:

1. Check browser console for errors
2. Check server logs for backend errors
3. Verify all environment variables are set
4. Try the setup script: `./setup.sh`
