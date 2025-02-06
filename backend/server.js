const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();

app.use(cors({
  origin: "https://my-mern-portfolio-ui.vercel.app", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());

const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
