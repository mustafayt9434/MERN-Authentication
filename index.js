const express = require('express');
const app = express();
const dbConnect = require("./config/dbConnection");
require('dotenv').config();
const cors = require("cors");
const path = require("path");

// Serve images from the "profile" folder
app.use("/profile", express.static(path.join(__dirname, "profile")));

app.use(express.json());
app.use(cors())
// db Connection
dbConnect;
// app routes
const appRoutes = require('./routes/index');
app.use('/api/v1', appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));