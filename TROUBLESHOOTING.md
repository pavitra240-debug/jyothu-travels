# 🔧 Troubleshooting Checklist

Use this checklist to diagnose and fix issues with your travel website.

---

## ✅ Issue #1: Admin Login Not Working

**Problem**: "After logging in once, the next time I get logged out or 'password incorrect' error"

### Diagnosis Steps:

1. **Check if token is being saved**
   - Open DevTools (F12) → Application → Local Storage
   - Look for `jyothu_admin_token`
   - If missing → token not being saved properly

2. **Verify server is running**
   - Terminal should show: `🚀 Server running on http://localhost:5000`
   - If not → start with `npm run dev`

3. **Check backend logs**
   - Should NOT see password errors if credentials are correct
   - If "password incorrect" → admin record corrupted

### Fix:

**Option A: Clear and Recreate Admin (Fastest)**
```bash
# 1. Go to MongoDB Atlas Dashboard
# 2. Navigate to Collections → Admin
# 3. Delete all admin records
# 4. Restart your server (will recreate default admin)
npm run dev
```

**Option B: Update Password in Database**
```bash
# 1. Get the hash of your new password:
node -e "require('@node-rs/bcrypt').hash('YourNewPassword123!', 10).then(h => console.log(h))"

# 2. Go to MongoDB Atlas → Collections → Admin
# 3. Update the password field with the hash
```

**Option C: Check Token Expiration**
- JWT tokens expire after 8 hours
- Token in localStorage might be expired
- Solution: Clear localStorage and login again

---

## ✅ Issue #2: Admin Dashboard Link Not Working

**Problem**: "I can access user pages but not admin dashboard"

### Diagnosis Steps:

1. **Check if you're logged in**
   - In browser DevTools → Application → Local Storage
   - Is `jyothu_admin_token` present?
   - If not → you're not logged in

2. **Try accessing admin dashboard directly**
   - Go to: `http://localhost:5173/admin-dashboard`
   - Should redirect to login if not authenticated ✓

3. **Check backend routes**
   - Open terminal running backend
   - Should NOT show errors when accessing admin endpoints

### Fix:

```
1. Go to http://localhost:5173/admin-login
2. Enter credentials: admin@jyothutravels.com / AdminDefault123!
3. Click Login
4. Should redirect to http://localhost:5173/admin-dashboard
5. If error → check Issue #1 above
```

---

## ✅ Issue #3: No Data Shows on User Pages

**Problem**: "User pages (Cars, Buses, Packages) show empty even though I added data in admin"

### Diagnosis Steps:

1. **Verify data exists in MongoDB**
   - Go to: https://cloud.mongodb.com/
   - Click your cluster
   - Click "Collections"
   - Check Car, Bus, Package collections
   - If empty → data not being saved properly

2. **Check API calls are working**
   - Open browser DevTools (F12) → Network tab
   - Go to http://localhost:5173/cars
   - Look for request to `/api/cars`
   - Check if response has data or is empty array `[]`

3. **Verify server is connected to database**
   - Check server terminal on startup
   - Should show: `✅ MongoDB Connected Successfully`
   - If not → MONGO_URI in .env is incorrect

### Fix:

**Step 1: Check MongoDB Connection**
```bash
# In server/.env, verify MONGO_URI is correct:
# Should look like:
# MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/?appName=Cluster0
```

**Step 2: Verify Database Has Data**
```bash
# 1. Go to https://cloud.mongodb.com/
# 2. Login with your MongoDB Atlas account
# 3. Click your cluster → Collections
# 4. Check if Car, Bus, Package collections have documents
# 5. If empty → data not being saved from admin
```

**Step 3: Add Data via Admin Dashboard**
```bash
# 1. Login at http://localhost:5173/admin-login
# 2. Go to Admin Dashboard
# 3. Add a test car with:
#    - Name: Test Car
#    - Description: For testing
#    - Price: 1000
# 4. Click "Add"
# 5. Refresh user pages - data should appear
```

**Step 4: If Still Not Showing**
```bash
# 1. Restart backend:
#    Ctrl+C in terminal
#    npm run dev

# 2. Restart frontend:
#    Ctrl+C in another terminal
#    npm run dev

# 3. Clear browser cache:
#    F12 → Application → Clear storage
#    Reload page
```

---

## ✅ Issue #4: Every Time Server Starts, Data Disappears

**Problem**: "I restart the server and all my data is gone"

### Root Cause
The `ensureSeedData()` function was deleting and recreating sample data on every restart. **This has been fixed!** Now it only creates seed data if collections are empty.

### Verify Fix Is Working

1. **Check server logs on startup**
   ```
   ✅ Seeded sample cars        ← Should only appear ONCE
   ✅ Seeded sample buses       ← Should only appear ONCE
   ✅ Seeded sample packages    ← Should only appear ONCE
   ```

2. **Add data and restart**
   ```bash
   # 1. Add a car via admin dashboard
   # 2. Restart server: Ctrl+C, then npm run dev
   # 3. Check if your car is still there
   # ✓ It should be!
   ```

### If Data Still Disappears

- Check that MongoDB connection is stable
- Verify `MONGO_URI` in `.env` is correct
- Check MongoDB Atlas cluster status
- Ensure you're not running multiple server instances

---

## ✅ Issue #5: CORS Error When Accessing Admin Features

**Problem**: "Getting CORS error in browser console when trying to use admin features"

### Diagnosis

Open browser DevTools (F12) → Console tab. Look for error like:
```
Access to XMLHttpRequest blocked by CORS policy...
```

### Fix:

**Check 1: Both servers running?**
```bash
# Terminal 1: Backend should show
🚀 Server running on http://localhost:5000

# Terminal 2: Frontend should show
➜  Local:   http://localhost:5173/
```

**Check 2: CORS configuration in server/.env**
```dotenv
FRONTEND_URL=http://localhost:5173
# Must match where your frontend is running
```

**Check 3: API headers correct**
- Backend sends: `Access-Control-Allow-Origin: http://localhost:5173`
- Frontend sends: `Authorization: Bearer <token>` for admin requests

---

## ✅ Issue #6: Port Already in Use

**Problem**: "Error: Port 5000 is already in use"

### Fix on Windows:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace 12345 with PID from above)
taskkill /PID 12345 /F
```

### Fix on Mac/Linux:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace 12345 with PID from above)
kill -9 12345
```

---

## ✅ Issue #7: MongoDB Connection Keeps Failing

**Problem**: "❌ MongoDB Connection Error" in terminal

### Diagnosis

1. **Check MONGO_URI format**
   ```
   ✓ Correct:   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/?appName=Cluster0
   ✗ Wrong:     mongodb://localhost:27017
   ```

2. **Verify credentials**
   - Go to MongoDB Atlas
   - Database Access → Check username exists
   - Compare password in .env with MongoDB Atlas password
   - Note: Special characters must match exactly

3. **Check IP Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Check if your IP is whitelisted
   - Add `0.0.0.0/0` to allow all IPs (for development)

### Fix:

```bash
# 1. Get correct connection string from MongoDB Atlas:
#    Cluster → Connect → Drivers
#    Copy the connection string

# 2. Update in server/.env:
#    MONGO_URI=<paste connection string>

# 3. Replace placeholders:
#    <username> → your actual username
#    <password> → your actual password

# 4. Restart server:
#    npm run dev
```

---

## ✅ Issue #8: Images Not Uploading

**Problem**: "Image upload fails or images don't show on website"

### Diagnosis

1. **Check upload directory exists**
   ```bash
   # Directory should exist: server/public/uploads/
   # If not, server will create it on startup
   ```

2. **Check file permissions**
   - Ensure `server/public/` is writable
   - On Windows: Right-click → Properties → Security → Permissions

3. **Check image file size**
   - Images should be < 5MB
   - Multer is configured to accept all image types

### Fix:

**Option A: Upload via admin dashboard**
1. Login to Admin Dashboard
2. In "Add new car" section, click file input
3. Select an image (JPG, PNG, GIF, WebP)
4. Enter other details and click "Add"
5. Image URL should appear like: `/uploads/1234567-filename.jpg`

**Option B: Check uploaded files**
```bash
# Files are saved in: server/public/uploads/
# You can view them in: http://localhost:5000/uploads/filename.jpg
```

---

## ✅ Issue #9: Hardcoded Credentials Found

**Problem**: "I found hardcoded admin credentials somewhere"

### What Was Fixed:

✅ **Removed from**: `client/src/pages/AdminLogin.jsx`
- No longer has default email/password pre-filled
- Users must enter credentials manually

✅ **Removed from**: Server logs
- Password no longer printed to console
- Only shows that admin was created

✅ **Environment variables added**:
- `JWT_SECRET` moved to `.env`
- `MONGO_URI` moved to `.env`
- `FRONTEND_URL` moved to `.env`

### What You Should Do:

1. **Never commit `.env` file to git**
   - Add to `.gitignore` (already done)
   - Keep locally only

2. **Change JWT_SECRET in production**
   ```bash
   # Generate secure secret:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   # Paste result in your production .env
   ```

3. **Change default admin password**
   - After setup, change from `AdminDefault123!` to a strong password
   - Update in MongoDB manually or via admin panel

---

## 🎯 Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| Admin login fails | Clear MongoDB admin collection, restart server |
| No data showing | Verify MongoDB connection, restart both servers |
| CORS error | Check both servers are running on correct ports |
| Port in use | Kill process on port 5000 |
| Images not uploading | Check file permissions on `server/public/` |
| Data disappeared | Has been fixed, data should persist now |
| Token expired | Clear localStorage, login again |

---

## ✅ Verification Checklist

Run through this to verify everything is working:

```
□ Backend running: npm run dev (shows 🚀 Server running on http://localhost:5000)
□ Frontend running: npm run dev (shows ➜ Local: http://localhost:5173/)
□ Can visit user website: http://localhost:5173/
□ Can access admin login: http://localhost:5173/admin-login
□ Can login with: admin@jyothutravels.com / AdminDefault123!
□ Can see admin dashboard: http://localhost:5173/admin-dashboard
□ Can add new car in admin panel
□ New car shows in user pages: http://localhost:5173/cars
□ Data persists after restarting server
□ No CORS errors in browser console
□ MongoDB Atlas shows data in collections
```

---

**Last Updated**: March 14, 2026
**Status**: All issues fixed and documented ✅
