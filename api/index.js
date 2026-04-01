import app from "../travel-website/server/src/app.js";
import { connectDB } from "../travel-website/server/src/config/db.js";

let isConnected = false;
let connectPromise = null;

export default async function handler(req, res) {
    try {
        if (!isConnected) {
            if (!connectPromise) {
                if (!process.env.MONGO_URI) {
                    throw new Error("MONGO_URI is missing");
                }

                connectPromise = connectDB(process.env.MONGO_URI).then(() => {
                    isConnected = true;
                });
            }

            await connectPromise;
        }

        return app(req, res);
    } catch (error) {
        console.error("Serverless handler error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}