// Vercel Serverless Entry Point
// Imports the configured Express app and exports it as the default handler.
// Vercel automatically wraps this in a serverless function.
import { connectDB } from '../travel-website/server/src/config/db.js';
import app from '../travel-website/server/src/app.js';

// Ensure the DB connection is established before handling requests.
// connectDB is idempotent – Mongoose will reuse an existing connection.
await connectDB(process.env.MONGO_URI);

export default app;
