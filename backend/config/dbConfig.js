const mongoose = require('mongoose');
mongoose.connect(process.env.mongoURL);

const connection = mongoose.connection;

connection.on('error',()=>{
    console.log("Error connecting to database");
});

connection.on('connected',()=>{
    console.log("Mongo DB connection successful.");
});

module.exports = connection;