const mongoose = require("mongoose");
const db = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongodb connected successfully");
  } catch (err) {
    console.error("db connected fail", err);
    process.exit();
  }
};

module.exports = connectDB;
