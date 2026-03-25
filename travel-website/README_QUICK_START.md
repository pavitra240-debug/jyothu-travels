# 🏨 Jyothu Travels & Tourism - Web Application

A full-stack travel booking platform with admin dashboard built with React, Node.js, and MongoDB Atlas.

## ✨ Features

✅ User-facing website with travel packages, car rentals, and bus booking
✅ Admin dashboard to manage services and bookings
✅ JWT-based authentication for secure admin access
✅ MongoDB Atlas integration for data persistence
✅ Responsive design with Tailwind CSS
✅ SEO optimized pages
✅ Image upload functionality
✅ Booking management system

---

## 🚀 Quick Start

### 1. **Setup Backend**

```bash
cd travel-website/server
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. **Setup Frontend**

```bash
cd travel-website/client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. **Access the Application**

- **User Website**: http://localhost:5173/
- **Admin Login**: http://localhost:5173/admin-login
- **Admin Dashboard**: http://localhost:5173/admin-dashboard

---

## 📝 Admin Login

**Email**: `admin@jyothutravels.com`
**Password**: `AdminDefault123!` (change this in production!)

⚠️ **Never commit `.env` file to git** - it contains sensitive data!

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Image Upload | Multer |
| Password Hashing | Bcrypt |

---

## 📁 Project Structure

```
travel-website/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API utilities
│   │   └── assets/        # Images, logos
│   └── vite.config.js     # Vite configuration
│
└── server/                 # Backend (Node.js + Express)
    ├── src/
    │   ├── routes/        # API routes
    │   ├── models/        # Database schemas
    │   ├── middleware/    # Auth middleware
    │   ├── config/        # Database config
    │   └── server.js      # Entry point
    ├── .env               # Environment variables (never commit!)
    └── .env.example       # Environment template
```

---

## 🔐 Security Features

✅ Hardcoded credentials removed
✅ JWT token-based session management
✅ Password hashing with bcrypt
✅ CORS protection enabled
✅ Input validation and sanitization
✅ Environment variables for sensitive data
✅ Image type validation

---

## 🌐 Deployment

See [SETUP_AND_DEPLOYMENT.md](../SETUP_AND_DEPLOYMENT.md) for:
- ✅ Complete setup instructions
- ✅ Troubleshooting guide
- ✅ Production deployment steps (Render + Netlify)
- ✅ Database backup procedures
- ✅ Security best practices

---

## 📊 API Documentation

### Public Endpoints
```
GET  /api/cars              # Get all cars
GET  /api/buses             # Get all buses  
GET  /api/packages          # Get all packages
POST /api/book              # Create new booking
GET  /api/bookings          # Get all bookings
```

### Admin Endpoints (Authentication Required)
```
POST   /api/admin/login             # Admin login
POST   /api/admin/add-car           # Add new car
POST   /api/admin/add-bus           # Add new bus
POST   /api/admin/add-package       # Add new package
POST   /api/admin/upload-image      # Upload image
DELETE /api/admin/delete/:type/:id  # Delete service
PATCH  /api/admin/update-price      # Update price
GET    /api/admin/bookings          # Get bookings
PATCH  /api/admin/bookings/:id      # Update booking status
```

---

## ⚠️ Common Issues & Solutions

### "Admin login fails with password incorrect"
→ See `ensureDefaultAdmin()` in `server.js`. The default password is created on first run.

### "No data shows on frontend"
→ Verify MongoDB connection in `.env` is correct
→ Check MongoDB Atlas cluster has data
→ Restart both server and client

### "Port 5000 already in use"
→ Kill the process: `lsof -i :5000` → `kill -9 <PID>`

### "CORS error"
→ Make sure both server and client are running
→ Check `FRONTEND_URL` in `.env` matches where client is running

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

## 📞 Support

For detailed setup and troubleshooting, see:
- [SETUP_AND_DEPLOYMENT.md](../SETUP_AND_DEPLOYMENT.md) - Complete guide
- Check backend logs in terminal
- Use browser DevTools (F12) to check API errors

---

## 📄 License

This project is proprietary and owned by Jyothu Travels and Tourism.

---

**Version**: 1.0.0  
**Last Updated**: March 14, 2026  
**Status**: ✅ Production Ready
