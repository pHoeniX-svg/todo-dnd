import colors from 'colors';
import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE_URI!);
    console.log(`MongoDB Connected: ${db.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    console.log(colors.enabled);
    process.exit(1);
  }
};

export { connectDB };
