const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((conn) => {
    console.log('Connected to the database...')}).catch((err) => {
    console.log('Error connecting to the database...');});

module.exports = dbConnect;