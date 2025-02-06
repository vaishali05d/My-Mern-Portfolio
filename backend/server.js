const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();
const allowedOrigins = ["https://my-mern-portfolioo-ui.vercel.app"];

app.use(cors({
  origin: allowedOrigins, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));


app.use(express.json());

const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
