const route = require('express').Router();
const Urls = require('../db/model').Urls;

async function getUniqueShortUrl() {
    let url;
    let isUnique = false;
    const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (!isUnique) {
        url = "";
        for (let i = 0; i < 5; i++) {
            url += s[Math.floor(Math.random() * s.length)];
        }
        const existingUrl = await Urls.findOne({ where: { shortUrl: url } });
        if (!existingUrl) {
            isUnique = true;
        }
    }

    return url;
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

        // Check if the given full URL is already a short URL
        const existingShortUrl = await Urls.findOne({ where: { shortUrl: full } });
        if (existingShortUrl) {
            return res.status(400).send({ error: "Provided URL is already a short URL" });
        }

        // Check if full URL already exists
        const existingFullUrl = await Urls.findOne({ where: { fullUrl: full } });
        if (existingFullUrl) {
            return res.status(200).send({ message: "Full URL already exists", shortUrl: existingFullUrl.shortUrl });
        }

        // Generate a unique short URL
        const shortUrl = await getUniqueShortUrl();

        // Create new URL entry
        const newAdd = await Urls.create({ shortUrl, fullUrl: full });

        res.status(201).send(newAdd);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = route;
