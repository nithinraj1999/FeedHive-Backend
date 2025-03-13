import mongoose from 'mongoose';
export const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_ORIGIN;
    console.log(mongoUri);
    
    if (!mongoUri) {
      throw new Error('MongoDB connection string is undefined');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};
  