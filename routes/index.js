const express = require('express');
const route = express.Router();
const Url = require('./../db/model');
const validator = require('validator');

async function getUniqueShortUrl() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = "";

    for (let i = 0; i < 5; i++) {
        shortUrl += characters[Math.floor(Math.random() * characters.length)];
    }

    return shortUrl;
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
        console.error("Error retrieving URL:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

route.post('/new', async (req, res) => {
    try {
        const { full, custom } = req.body;

        try {
            new URL(full);
        } catch (error) {
            return res.status(400).send({ error: "Valid full URL is required" });
        }

        const existingFullUrl = await Url.findOne({ fullUrl: full });
        if (existingFullUrl) {
            return res.status(200).send({ message: "Full URL already exists", shortUrl: existingFullUrl.shortUrl });
        }

        const existingShortUrl = await Url.findOne({ shortUrl: full.substring(full.lastIndexOf('/') + 1) });
        if (existingShortUrl) {
            return res.status(400).send({ message: "Input URL is already a shortened URL", shortUrl: existingShortUrl.shortUrl });
        }

        if (custom) {
            const existingCustomUrl = await Url.findOne({ shortUrl: custom });
            if (existingCustomUrl) {
                return res.status(400).send({ message: "Custom short URL already in use" });
            }
        }

        const shortUrl = custom || await getUniqueShortUrl();

        const newUrl = new Url({ shortUrl, fullUrl: full });
        await newUrl.save();

        await checkAndClearUrls();

        res.status(201).send(newUrl);
    } catch (error) {
        console.error("Error in creating short URL:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


module.exports = route;
