const express = require('express');
const connectDB = require("./src/config/database")
require('dotenv').config();

const app = express();

app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
