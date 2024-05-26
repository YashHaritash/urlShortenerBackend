const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const db = require('./db/model').db;
const urlRoute = require('./routes/index').route

app.use('/home',express.static(__dirname+'/public'))
app.use('/',urlRoute);


db.sync()
    .then(()=>{
        app.listen(3131,()=>{
            console.log("Server Running at http://localhost:3131");
        })
    })
    .catch((err)=>{
        console.log("Problem Syncing the db")
    })




