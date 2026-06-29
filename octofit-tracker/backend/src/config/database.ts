import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionString, {
    dbName: 'octofit_db',
  });
}
