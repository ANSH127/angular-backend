require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.use(express.json());


// connect to the database

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});