require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const confessionRoutes = require('./routes/confession');
const cors = require('cors');
const app = express();


// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use(express.json());


app.use(cors(
    {
        origin: process.env.CLIENT_URL
    }
));



// routes
app.use('/api', userRoutes);
app.use('/api', confessionRoutes);


// connect to the database

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

// listen to the server
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});