# Jyothu Travels - Complete Setup & Deployment Guide

## 🎯 Overview

This is a full-stack travel booking application built with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (cloud)
- **Authentication**: JWT (JSON Web Tokens)

---

## 🚀 Quick Start - Development Environment

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

### Step 1: Setup Backend

1. Navigate to the server folder:
```bash
cd travel-website/server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB Atlas connection string:
```dotenv
MONGO_URI=mongodb+srv://your_username:your_password@cluster.xxxxx.mongodb.net/?appName=Cluster0
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_12345
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

   **How to get MongoDB Connection String:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a cluster
   - Click "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

5. Start the backend server:
```bash
npm run dev
```

   You should see:
   ```
   ✅ MongoDB Connected Successfully
   ✅ Default admin created: admin@jyothutravels.com / Check setup documentation for password
   ✅ Seeded sample cars
   ✅ Seeded sample buses
   ✅ Seeded sample packages
   🚀 Server running on http://localhost:5000
   ```

### Step 2: Setup Frontend

1. In a new terminal, navigate to the client folder:
```bash
cd travel-website/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

   You should see:
   ```
   VITE v... ready in ... ms
   ➜  Local:   http://localhost:5173/
   ```

4. Open http://localhost:5173/ in your browser ✅

---

## 🔐 Admin Login & Password Management

### Default Admin Credentials
- **Email**: `admin@jyothutravels.com`
- **Password**: Check the password you set during setup (default: `AdminDefault123!`)

### Change Admin Password
1. Login to admin dashboard
2. Use the "Change Password" feature (if implemented) or...
3. **Temporary Solution**: Use MongoDB Compass to update the password hash

**To generate a secure password hash:**
```bash
node -e "require('@node-rs/bcrypt').hash('your_new_password', 10).then(console.log)"
```

---

## 🔧 Troubleshooting

### Issue: "Admin login fails with 'password incorrect'"

**Solution**: This happens if the password hash in the database is corrupted. 

1. Clear the admin collection from MongoDB Atlas
2. Restart the server - it will recreate the default admin
3. Login with the default password

### Issue: "No data shows on user pages even though I added data in admin panel"

**Solution**: Data should persist because it's stored in MongoDB Atlas. If it's missing:

1. Check MongoDB connection string in `.env`
2. Verify data exists in MongoDB Atlas dashboard
3. Restart both backend and frontend
4. Check browser console for errors (F12)

### Issue: "Port 5000 already in use"

**Solution**:
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: "CORS error when accessing admin dashboard"

**Solution**: Make sure:
1. Backend is running on http://localhost:5000
2. Frontend is running on http://localhost:5173
3. Both are on the same machine during development
4. Check that `FRONTEND_URL` in `.env` matches where frontend is running

---

## 📱 Data Persistence Explained

### How It Works
- **Data is stored in MongoDB Atlas** (cloud database)
- **When you restart the server**, data is NOT lost
- **Seed data only runs once** - if collections already have data, they won't be recreated
- **Uploaded images** are stored in `server/public/uploads/`

### Why You Lost Data Before
- **Seed data was running every time** - this has been fixed
- **Database connection was failing** - check your MONGO_URI

### Making Sure Data Persists
1. Always use the same MongoDB Atlas cluster for both development and production
2. Don't modify `ensureSeedData()` function unnecessarily
3. Backup important data periodically from MongoDB Atlas

---

## 🌐 Deployment to Production

### Option 1: Deploy to Render (Recommended - Free)

#### Backend Deployment

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/travelling-agency.git
git push -u origin main
```

2. Go to https://render.com and sign up

3. Click "New +" → "Web Service"

4. Connect your GitHub repository

5. Configure:
   - **Name**: jyothu-travels-server
   - **Environment**: Node
   - **Build Command**: `cd travel-website/server && npm install`
   - **Start Command**: `cd travel-website/server && npm start`
   - **Publish Port**: 5000

6. Add Environment Variables (click "Advanced"):
   ```
   MONGO_URI=<your MongoDB connection string>
   JWT_SECRET=<generate a secure secret>
   FRONTEND_URL=https://yourdomain.netlify.app (or your actual frontend URL)
   NODE_ENV=production
   PORT=5000
   ```

7. Click "Create Web Service" and wait for deployment ✅

#### Frontend Deployment

1. Go to https://netlify.com and sign up

2. Click "New site from Git"

3. Connect your GitHub repository

4. Configure:
   - **Base Directory**: `travel-website/client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

5. Click "Deploy site"

6. In your Netlify site settings → Environment:
   - Add `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

7. Redeploy your site

### Option 2: Deploy to Vercel (Frontend only)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Set base directory to `travel-website/client`
4. Add environment variable `VITE_API_URL` pointing to your backend

### Option 3: Deploy to Heroku (Deprecated - No Longer Free)

Heroku's free tier is no longer available. Use Render instead.

---

## 🔒 Security Best Practices

### ✅ What Has Been Fixed
1. **Removed hardcoded admin credentials** from frontend
2. **JWT tokens** for session management
3. **Password hashing** with bcrypt
4. **CORS protection** enabled
5. **Environment variables** for sensitive data

### ⚠️ Still Need to Do for Production

1. **Change JWT_SECRET**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Enable HTTPS** (automatic on Render/Netlify/Vercel)

3. **Set strong admin password** and change periodically

4. **Use Rate Limiting** (optional - prevents brute force attacks):
   ```javascript
   // In server.js, add:
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use(limiter);
   ```

5. **Hide error messages** in production (don't expose stack traces)

6. **Add input validation** to prevent SQL injection

7. **Keep dependencies updated**:
   ```bash
   npm update
   npm audit fix
   ```

---

## 📊 Database Backups

### Manual Backup (MongoDB Atlas)
1. Go to MongoDB Atlas Dashboard
2. Your Cluster → Backup
3. Click "Take Snapshot"

### Automatic Backups
- MongoDB Atlas Free tier: Stores snapshots for 7 days
- Paid tier: Customizable retention

---

## 🤝 API Endpoints Reference

### Public Endpoints (No Authentication Required)

```
GET  /api/cars         - Get all cars
GET  /api/buses        - Get all buses
GET  /api/packages     - Get all packages
GET  /api/bookings     - Get all bookings
POST /api/book         - Create new booking
```

### Admin Endpoints (Requires JWT Token)

```
POST   /api/admin/login           - Admin login
POST   /api/admin/upload-image    - Upload car/bus/package image
POST   /api/admin/add-car         - Add new car
POST   /api/admin/add-bus         - Add new bus
POST   /api/admin/add-package     - Add new package
GET    /api/admin/cars            - Get all cars (admin view)
GET    /api/admin/buses           - Get all buses (admin view)
GET    /api/admin/packages        - Get all packages (admin view)
GET    /api/admin/bookings        - Get all bookings
DELETE /api/admin/delete/:type/:id - Delete car/bus/package
PATCH  /api/admin/update-price/:type/:id - Update price
PATCH  /api/admin/bookings/:id    - Update booking status
```

---

## 📝 Development Tips

### Common Npm Commands

**Frontend:**
```bash
cd travel-website/client
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
```

**Backend:**
```bash
cd travel-website/server
npm run dev      # Start development server
npm start        # Start production server
```

### How Server and Client Work Together

```
User visits website
        ↓
Browser loads React (Vite) from localhost:5173
        ↓
React makes API calls to /api/...
        ↓
Vite proxy redirects to localhost:5000 (backend)
        ↓
Express handles request and queries MongoDB
        ↓
Data sent back to frontend
        ↓
Frontend renders data
```

During **development**: You need both servers running
During **production**: Only backend URL matters (frontend is compiled)

---

## ✅ Your Questions Answered

### Q: "Should I run the server every time?"
**A**: 
- **Development**: Yes, run both server and client every time you need to test
- **Production**: The deployed server runs 24/7 (auto-restarts if crashes)
- **Frontend**: Deployed to CDN, served automatically

### Q: "Why do I lose data?"
**A**: You were losing seeded data because `ensureSeedData()` was running every startup. This has been fixed - now it only creates data if collections are empty.

### Q: "How do I make sure data appears?"
**A**: 
1. Add data via admin dashboard (saves to MongoDB)
2. Data automatically syncs to all user pages
3. Data persists even if you restart the server
4. Check MongoDB Atlas to verify data is actually there

### Q: "How do I go from localhost to public?"
**A**: Follow the "Deployment to Production" section above. Use Render + Netlify for easiest setup.

---

## 🆘 Need More Help?

1. Check MongoDB Atlas logs for connection issues
2. Use browser DevTools (F12) to see API errors
3. Check backend terminal for console logs
4. Try restarting both server and client
5. Clear browser cache (Ctrl+Shift+Delete)

---

**Last Updated**: March 14, 2026
**Version**: 1.0.0
