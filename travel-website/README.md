# Jyothu Travels – Full Stack

- **Client:** React (Vite) on `http://localhost:5173`
- **Server:** Node.js (Express) on `http://localhost:5000`
- **DB:** MongoDB Atlas

## Run the______ full stack

1. **Environment**  
   In `server/.env` set:
   - `MONGO_URI` – your MongoDB Atlas connection string
   - `PORT=5000`
   - `JWT_SECRET` – any secret string

2. **Start _____backend** (from `server`):
   ```bash
   cd server
   npm install
   node src/server.js
   ```
   You should see: `MongoDB Connected` and `Server running on http://localhost:5000`.

3. **Start frontend** (from `client`):
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Open **http://localhost:5173**. The Vite proxy sends `/api` to the server.

## Default admin

- Email: `admin@jyothutravels.com`
- Password: `admin123`

## If MongoDB still fails (querySrv / ECONNREFUSED)

- The app uses public DNS (1.1.1.1, 8.8.8.8) to fix Node.js 22+ on Windows.
- If it still fails: check firewall/VPN, or in Atlas use **Connect → Drivers** and try the **standard** (non-SRV) connection string in `MONGO_URI`.
