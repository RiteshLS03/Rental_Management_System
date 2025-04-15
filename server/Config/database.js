// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     // Connecting to MongoDB
//     const connect = await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // Additional options can be added here as per need
//       useCreateIndex: true, // Optional: Ensures indexes are created
//       useFindAndModify: false, // Optional: Prevents MongoDB's deprecation warning for findAndModify
//     });
//     console.log(`✅ MongoDB Connected: ${connect.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1); // Exit with failure when connection fails
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connecting to MongoDB
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure when connection fails
  }
};

module.exports = connectDB;
