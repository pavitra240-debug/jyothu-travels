import serverless from 'serverless-http';
import app from '../../server/src/app.js';
import { connectDB } from '../../server/src/config/db.js';

// Ensure database connection in a serverless environment
const handler = serverless(app);

export const api = async (event, context) => {
  // Database connection is persistent across invocations in many serverless environments
  // but we ensure it's established here.
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.error('Database connection error in function:', err);
  }
  
  return await handler(event, context);
};

export { handler }; // For standard serverless-http usage
