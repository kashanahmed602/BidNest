const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            ssl: true,
            retryWrites: true,
        });

        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failed", error);
    }
};

module.exports = connectDB;