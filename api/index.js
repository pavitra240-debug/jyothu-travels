// Vercel Serverless Entry Point

import app from '../travel-website/server/src/app.js';
import { connectDB } from '../travel-website/server/src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        await connectDB(process.env.MONGO_URI);
        isConnected = true;
    }

    return app(req, res);
}