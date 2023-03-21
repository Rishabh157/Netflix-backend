require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connected successfully 🌎')
    } catch (err) {
        console.log('Something Went Wrong with Database');
        process.exit(1);
    }
}
module.exports = connectToMongoDb;
