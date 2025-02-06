const express = require('express');
require('dotenv').config();
const app = express();
const dbConfig = require('./config/dbConfig');

const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});