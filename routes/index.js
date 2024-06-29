const route = require('express').Router();
const Urls = require('../db/model').Urls;

async function getUniqueShortUrl() {
    const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let url = "";

    for (let i = 0; i < 5; i++) {
        url += s[Math.floor(Math.random() * s.length)];
    }

    return url;
}


const MAX_URLS = 1000;

async function checkAndClearUrls() {
    const count = await Urls.count(); 

    if (count > MAX_URLS) {

        const oldestUrls = await Urls.findAll({
            order: [['createdAt', 'ASC']],
            limit: count - MAX_URLS 
        });


        for (let url of oldestUrls) {
            await url.destroy();
        }
    }
}


route.get('/:short', async (req, res) => {
    try {
        const data = await Urls.findOne({
            where: { shortUrl: req.params.short }
        });

        if (data) {
            res.redirect(data.fullUrl);
        } else {
            res.status(404).send({ error: "No such URL Found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});


route.post('/new', async (req, res) => {
    try {
        const { full } = req.body;
        if (!full) {
            return res.status(400).send({ error: "Full URL is required" });
        }

        const existingFullUrl = await Urls.findOne({ where: { fullUrl: full } });
        if (existingFullUrl) {
            return res.status(200).send({ message: "Full URL already exists", shortUrl: existingFullUrl.shortUrl });
        }

        const shortUrl = await getUniqueShortUrl();


        const newAdd = await Urls.create({ shortUrl, fullUrl: full });


        await checkAndClearUrls();

        res.status(201).send(newAdd);
    } catch (error) {
        console.error("Error in creating short URL:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = route;
