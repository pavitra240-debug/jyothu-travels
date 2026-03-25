# 🚀 Production Deployment Checklist

Use this checklist before deploying your website to production.

---

## ✅ Pre-Deployment Verification

### Security Checks
- [ ] `server/.env` file is in `.gitignore` and NOT committed to git
- [ ] `client/.env` (if exists) is in `.gitignore`
- [ ] Changed `JWT_SECRET` to a strong, random value
- [ ] Changed default admin password from `AdminDefault123!` to something secure
- [ ] No hardcoded credentials in any source files
- [ ] MONGO_URI uses proper credentials (not shared/weak)
- [ ] Email validation working on booking form
- [ ] Phone number validation working on booking form

### Functionality Tests
- [ ] User can browse packages, cars, buses without logging in
- [ ] User can make bookings
- [ ] Admin can login with credentials
- [ ] Admin can add new services (cars, buses, packages)
- [ ] Admin can update prices
- [ ] Admin can delete services
- [ ] Admin can manage bookings (approve/reject)
- [ ] Admin can upload images
- [ ] Admin logout works properly
- [ ] Data persists after server restart
- [ ] Images are saved and displayed correctly

### Browser & Device Tests
- [ ] Website works on desktop (Chrome, Firefox, Safari)
- [ ] Website works on tablet
- [ ] Website works on mobile
- [ ] No console errors in DevTools (F12)
- [ ] No warnings in DevTools
- [ ] All links work
- [ ] All images load
- [ ] Forms submit properly

### MongoDB Tests
- [ ] MongoDB Atlas cluster is active
- [ ] IP whitelist allows production server IP (or use 0.0.0.0/0 initially)
- [ ] Connection string is correct
- [ ] Data exists in database
- [ ] Can query collections from MongoDB Atlas dashboard
- [ ] Automatic backups enabled in MongoDB Atlas

### API Tests
- [ ] Backend API endpoints return correct data
- [ ] CORS headers are set properly
- [ ] Authentication endpoints work
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting configured (optional but recommended)

---

## 📋 Backend Deployment (Render)

### Step 1: Prepare Repository
- [ ] All code committed to git
- [ ] `.env` file is NOT in git (check `.gitignore`)
- [ ] `node_modules` is in `.gitignore`
- [ ] No build errors: `npm run build` works

### Step 2: Deploy to Render
- [ ] Create account on https://render.com
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Select Node environment
- [ ] Build Command: `cd travel-website/server && npm install`
- [ ] Start Command: `cd travel-website/server && npm start`
- [ ] Port: 5000

### Step 3: Environment Variables (in Render)
- [ ] `MONGO_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Strong random secret (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] `FRONTEND_URL` = Your frontend URL (e.g., https://yourdomain.netlify.app)
- [ ] `PORT` = 5000
- [ ] `NODE_ENV` = production

### Step 4: Verify Backend
- [ ] Backend deployed successfully
- [ ] No errors in Render logs
- [ ] Backend URL is accessible (e.g., https://jyothu-travels.onrender.com)
- [ ] API endpoints respond: `https://your-backend.onrender.com/api/cars`
- [ ] Login endpoint works: `POST https://your-backend.onrender.com/api/admin/login`

---

## 📋 Frontend Deployment (Netlify)

### Step 1: Prepare Frontend
- [ ] All code committed to git
- [ ] Remove any hardcoded localhost URLs
- [ ] Build succeeds: `npm run build` (creates `dist/` folder)
- [ ] Preview works: `npm run preview`

### Step 2: Deploy to Netlify
- [ ] Create account on https://netlify.com
- [ ] Import GitHub repository
- [ ] Base directory: `travel-website/client`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`

### Step 3: Environment Variables (in Netlify)
- [ ] `VITE_API_URL` = Your backend API URL (e.g., https://jyothu-travels.onrender.com/api)

### Step 4: Verify Frontend
- [ ] Frontend deployed successfully
- [ ] Website loads at your Netlify URL
- [ ] User pages display data from backend
- [ ] Admin login redirects correctly
- [ ] Images load from backend

### Step 5: Configure Domain (Optional)
- [ ] Add custom domain in Netlify
- [ ] Configure DNS settings
- [ ] Enable HTTPS (automatic with Netlify)

---

## 🌐 Alternative: Deploy Both to Vercel

### Backend (can't run on Vercel, use Render instead)
- Vercel is frontend-only
- Use Render for backend
- Use Vercel for frontend OR Netlify

### Frontend on Vercel
- [ ] Create account on https://vercel.com
- [ ] Import GitHub repository
- [ ] Root directory: `travel-website/client`
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next` (or `dist` for Vite)
- [ ] Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL

---

## 🔒 Production Security Checklist

### HTTPS/SSL
- [ ] Frontend: Automatic with Netlify/Vercel ✓
- [ ] Backend: Automatic with Render ✓
- [ ] SSL certificate installed
- [ ] All requests redirect to HTTPS

### Authentication & Secrets
- [ ] No secrets in git repository
- [ ] JWT_SECRET is unique and strong
- [ ] Default admin password changed
- [ ] Admin account uses strong password (12+ characters, mixed case, numbers, symbols)
- [ ] Database user has minimal required permissions
- [ ] API keys not exposed in frontend code

### Database Security
- [ ] MongoDB IP whitelist configured
- [ ] Database backups enabled
- [ ] Automated backup schedule set
- [ ] Test restore from backup works

### API Security
- [ ] CORS whitelist set to your domains only
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info
- [ ] Auth middleware on all protected routes
- [ ] HTTPS enforced (no HTTP)

### Frontend Security
- [ ] Sensitive data not stored in localStorage (only JWT token)
- [ ] XSS protection enabled
- [ ] CSP headers configured (optional)
- [ ] Update dependencies regularly: `npm update`

---

## 📞 Post-Deployment Testing

### User Experience
- [ ] User can browse website from anywhere
- [ ] Can see all packages/cars/buses
- [ ] Can make bookings
- [ ] Receives booking confirmation
- [ ] Website loads in < 3 seconds
- [ ] Mobile experience is smooth

### Admin Experience
- [ ] Can login from anywhere
- [ ] Can add/edit/delete services
- [ ] Can manage bookings
- [ ] Images upload and display correctly
- [ ] Session doesn't drop unexpectedly
- [ ] Logout works

### Data Consistency
- [ ] Data added via admin appears to users within seconds
- [ ] Database backups are working
- [ ] Can access MongoDB Atlas dashboard
- [ ] Data volume is within MongoDB limits

### Error Handling
- [ ] Booking validation works
- [ ] Admin form validation works
- [ ] Helpful error messages display
- [ ] No 500 errors visible to users
- [ ] Server restart doesn't lose data

### Monitoring
- [ ] Check Render logs for errors
- [ ] Check Netlify deploy logs
- [ ] Monitor database connection
- [ ] Set up alerts for failures (optional)

---

## 🐛 Common Production Issues & Fixes

### Issue: "Frontend can't connect to backend"
**Fix:**
1. Check `VITE_API_URL` environment variable
2. Verify backend is running on Render
3. Check CORS settings in backend .env
4. Verify `FRONTEND_URL` matches your domain

### Issue: "Data not showing on user pages"
**Fix:**
1. Verify MongoDB connection in backend
2. Check if data exists in MongoDB Atlas
3. Add test data via admin dashboard
4. Check browser network tab for API response

### Issue: "Admin login not working"
**Fix:**
1. Verify `JWT_SECRET` is set in backend
2. Check admin credentials in MongoDB
3. Clear browser localStorage
4. Check backend logs for auth errors

### Issue: "Images not uploading"
**Fix:**
1. Check write permissions on server
2. Verify image file type (JPG, PNG only)
3. Check file size limit (5MB)
4. Verify upload directory exists

### Issue: "Session expires too quickly"
**Fix:**
1. Check JWT token expiration (set to 8h)
2. Verify browser localStorage works
3. Check server time synchronization
4. Clear browser cache and try again

---

## 📊 Monitoring & Maintenance

### Daily Checks
- [ ] Website is accessible
- [ ] Admin can login
- [ ] User data is visible
- [ ] No error messages in logs

### Weekly Checks
- [ ] Review MongoDB backups
- [ ] Check backend logs for errors
- [ ] Test admin functionality
- [ ] Verify data integrity

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review security logs
- [ ] Backup database manually
- [ ] Test disaster recovery
- [ ] Update SSL certificates (auto with Render/Netlify)

### When Issues Arise
1. Check backend logs on Render
2. Check frontend logs in browser console
3. Check MongoDB Atlas status
4. Review `.env` variables are correct
5. Check git repository for recent changes

---

## 📈 Performance Optimization (Optional)

- [ ] Enable gzip compression (automatic with Render)
- [ ] Set up CDN for images (optional)
- [ ] Optimize images size
- [ ] Enable database indexing
- [ ] Set up caching headers
- [ ] Monitor response times

---

## 🎯 Final Verification

Before considering production ready:

```bash
# Run this checklist
□ User website accessible from internet ✓
□ Admin dashboard accessible from internet ✓
□ All user features work ✓
□ All admin features work ✓
□ Data persists ✓
□ HTTPS working ✓
□ No console errors ✓
□ No backend errors ✓
□ Mobile responsive ✓
□ Database backups working ✓
```

---

## 🆘 Emergency Procedures

### If Website Goes Down
1. Check Render backend status
2. Check Netlify frontend status
3. Check MongoDB Atlas status
4. Check backend logs for errors
5. Restart backend on Render
6. Clear browser cache and try again

### If Admin Login Broken
1. Verify `JWT_SECRET` in `.env`
2. Check admin record in MongoDB
3. Recreate admin user if needed
4. Restart backend

### If Data Is Lost
1. Check MongoDB Atlas backup
2. Restore from backup
3. Verify data recovery
4. Test all functionality

---

## 📞 Support Contacts

- **Render Support**: https://render.com/support
- **Netlify Support**: https://www.netlify.com/support
- **MongoDB Support**: https://www.mongodb.com/support
- **GitHub Support**: https://support.github.com/

---

**Last Checklist Update**: March 14, 2026
**Status**: Ready for Production ✅

Good luck with your deployment! 🚀
