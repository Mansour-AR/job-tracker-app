import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database connected: true');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export default connectDB;