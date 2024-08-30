const mongoose = require('mongoose');
const { MONGODB_URI } = require('../environment');

const connectDB = async () => {
    try {
        // const mongoURI = process.env.MONGODB_URI;
        // console.log("🚀 ~ mongoURI:", MONGODB_URI);
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Atlas connection established successfully.');
    } catch (err) {
        console.error('❌ MongoDB Atlas connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;