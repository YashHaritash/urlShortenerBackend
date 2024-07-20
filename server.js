const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const urlRoute = require('./routes/index');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/home', express.static(__dirname + '/public'));
app.use('/', urlRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3131, () => {
            console.log("Server Running at https://urlshortenerbackend-viev.onrender.com");
        });
    })
    .catch((err) => {
        console.log("Problem Connecting to the DB", err);
    });
