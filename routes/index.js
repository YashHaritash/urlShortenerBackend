const route = require('express').Router();
const Urls = require('../db/model').Urls;

function getShortUrl(){
    let url = "";
    let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0;i<5;i++){
        url += s[Math.floor(Math.random()*s.length)];
    }
    return url;
}

route.get('/:short',async (req,res)=>{
    const data = await Urls.findOne({
        where : {
            shortUrl : req.params.short
        }
    })

    if(data){
        res.redirect(data.fullUrl);
    
    }
    else{
        res.send({
            error : "No such Url Found"
        })
    }
})

route.post('/new',async (req,res)=>{
    console.log(req.body);
    let newAdd = await Urls.create({
        shortUrl : getShortUrl(),
        fullUrl : req.body.full
    })

    console.log(newAdd);
    res.send(newAdd);
})

module.exports = {
    route
}