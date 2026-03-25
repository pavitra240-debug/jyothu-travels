# Jyothu Travels Admin Access Guide

## Admin Credentials

**Email:** `siddarthbn9@gmail.com`  
**Password:** `siddarthvj2305`

---

## Admin Login Process

### 1. **Access Admin Login**
Navigate to the admin login page at:
```
http://localhost:5173/admin-login
```

### 2. **Authentication Flow**
- Enter your email and password in the login form
- The frontend sends credentials to the backend API: `POST /api/admin/login`
- The backend retrieves your admin record from MongoDB by email
- Your entered password is compared against the hashed password in the database using bcrypt
- If credentials match, a JWT token is generated with 1-hour expiration
- The token is stored in browser localStorage as `jyothu_admin_token`

### 3. **Access Admin Dashboard**
Once logged in, you can access:
```
http://localhost:5173/admin-dashboard
```

The dashboard is protected - only users with a valid JWT token can access it.

---

## Admin Features

### Dashboard Access
- **Browse Bookings:** View all customer travel bookings
- **Update Booking Status:** Mark bookings as confirmed, pending, or completed
- **Manage Listings:**
  - Add/Edit/Delete travel packages
  - Add/Edit/Delete car rentals
  - Add/Edit/Delete buses
  - Upload images for your services
  - Update pricing and descriptions

### API Endpoints (Protected)

All endpoints below require a valid JWT token in the `Authorization` header:

```bash
Authorization: Bearer <your_jwt_token>
```

#### **Bookings**
- `GET /api/admin/bookings` — Fetch all bookings
- `PATCH /api/admin/bookings/:id` — Update booking status

#### **Upload Images**
- `POST /api/admin/upload-image` — Upload image for a service

#### **Travel Packages**
- `POST /api/admin/add-package` — Create new package
- `GET /api/admin/packages` — Fetch all packages
- `DELETE /api/admin/delete/package/:id` — Delete package
- `PATCH /api/admin/update-price/package/:id` — Update package price

#### **Cars**
- `POST /api/admin/add-car` — Add new car
- `GET /api/admin/cars` — Fetch all cars
- `DELETE /api/admin/delete/car/:id` — Delete car
- `PATCH /api/admin/update-price/car/:id` — Update car price

#### **Buses**
- `POST /api/admin/add-bus` — Add new bus
- `GET /api/admin/buses` — Fetch all buses
- `DELETE /api/admin/delete/bus/:id` — Delete bus
- `PATCH /api/admin/update-price/bus/:id` — Update bus price

---

## Security Details

### Password Security
- Admin passwords are **hashed using bcrypt** (10 salt rounds) before storage in MongoDB
- Plaintext passwords are **never stored** in the database
- Each login attempt compares the entered password against the hashed value
- Passwords in `.env` are for reference only; actual validation happens against MongoDB records

### JWT Token
- Tokens are issued with **1-hour expiration**
- Stored in browser localStorage (not secure for production apps)
- Sent in the `Authorization` header for each protected API request
- Middleware validates token signature and expiration on each protected route

### Session Management
- Clicking "Logout" removes the token from localStorage
- Closing the browser doesn't automatically log you out (token persists)
- Expired tokens result in automatic logout with "Session expired" message

---

## Logging In Locally

### Development Server
1. Start the backend server:
   ```bash
   cd travel-website/server
   npm install
   nodemon src/server.js
   ```

2. Start the frontend dev server:
   ```bash
   cd travel-website/client
   npm run dev
   ```

3. Navigate to `http://localhost:5173/admin-login`
4. Use credentials above to log in

### Production
Replace `localhost:5173` with your deployed domain URL.

---

## Changing Admin Credentials

### Step 1: Update .env
Edit `travel-website/server/.env`:
```
ADMIN_EMAIL=newemail@example.com
ADMIN_PASSWORD=newpassword123
```

### Step 2: Restart Server
```bash
cd travel-website/server
npm install  # Ensures bcrypt is installed
nodemon src/server.js
```

### Step 3: Clear Existing Admins (Optional)
If an admin already exists with the old email:
- Manually delete the admin record from MongoDB Admin collection
- Or the new credentials will be used next time you log in

The password is automatically hashed when the admin record is created.

---

## Troubleshooting

### Login Fails with "Invalid email or password"
- Check spelling of email and password
- Ensure database is connected (MongoDB URI is correct in `.env`)
- Verify the admin record exists in the `admins` collection in MongoDB

### Token Expired Error
- Your JWT token expires after 1 hour
- Simply log in again to get a new token

### Can't Access Admin Dashboard
- Ensure you're logged in (check if token exists in localStorage)
- Try logging out and logging back in
- Check browser console for any error messages

### Database Connection Issues
- Verify `MONGO_URI` in `.env` is correct
- Ensure MongoDB Atlas cluster is active and IP whitelist includes your IP
- Check Node.js console for connection error messages

---

## API Call Examples

### Login Request
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "siddarthbn9@gmail.com",
    "password": "siddarthvj2305"
  }'
```

### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Request (e.g., Get Bookings)
```bash
curl -X GET http://localhost:5000/api/admin/bookings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Notes

- **Never commit .env files** with real credentials to version control
- Use strong, unique passwords in production
- Rotate JWT secrets periodically for security
- Keep bcrypt dependency updated (`npm update @node-rs/bcrypt`)
- Monitor admin login logs for suspicious activity in production

For questions or issues, contact the development team.
