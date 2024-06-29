const express = require('express');
const route = express.Router();
const Url = require('./../db/model');
const validator = require('validator');

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
    const count = await Url.countDocuments();

    if (count > MAX_URLS) {
        const oldestUrls = await Url.find().sort({ createdAt: 1 }).limit(count - MAX_URLS);

        for (let url of oldestUrls) {
            await url.remove();
        }
    }
}

route.get('/:short', async (req, res) => {
    try {
        const data = await Url.findOne({ shortUrl: req.params.short });

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

        // if (!validator.isURL(full)) {
        //     return res.status(400).send({ error: "Invalid URL" });
        // }

      
        const existingShortUrl = await Url.findOne({ shortUrl: full.slice(-5) });
        if (existingShortUrl) {
            return res.status(200).send({ message: "Input URL is already a shortened URL" , shortUrl: existingShortUrl.shortUrl });
        }


        const existingFullUrl = await Url.findOne({ fullUrl: full });
        if (existingFullUrl) {
            return res.status(200).send({ message: "Full URL already exists", shortUrl: existingFullUrl.shortUrl });
        }

        const shortUrl = await getUniqueShortUrl();

        const newAdd = new Url({ shortUrl, fullUrl: full });
        await newAdd.save();

        await checkAndClearUrls();

        res.status(201).send(newAdd);
    } catch (error) {
        console.error("Error in creating short URL:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = route;
