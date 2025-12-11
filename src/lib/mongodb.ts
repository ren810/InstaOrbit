import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable in .env.local');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment global type for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

cached = global.mongoose as MongooseCache;

const dbConnect = async (): Promise<Mongoose> => {
  // Return cached connection if available (improves performance for SSR)
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // Create new connection promise if not exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering for better SSR performance
      dbName: 'instaorbit',
      maxPoolSize: 10, // Connection pool for better performance
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((result) => {
        console.log('✅ Connected to MongoDB successfully');
        return result;
      })
      .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error);
        // Reset promise on error so next call will retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default dbConnect;
