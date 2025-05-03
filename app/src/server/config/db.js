// const mongoose = require('mongoose');
// const connectDB = async () => {
  
//   try {
//     mongoose.set('strictQuery', false);
//     const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/test');
//     console.log(`Database Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//   }

// }

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/test';
  
  while (true) {
    try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(mongoUri);
      console.log(`✅ Database Connected: ${conn.connection.host}`);
      break; // ✅ Exit loop if successful
    } catch (error) {
      console.error(`❌ MongoDB connection failed, retrying in 5 seconds...`, error.message);
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
};

module.exports = connectDB;
