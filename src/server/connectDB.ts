import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/shedule';

if (!DATABASE_URL) {
  console.log(DATABASE_URL)
  throw new Error(DATABASE_URL);
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

