const express = require('express');
const Tweet = require('../models/tweet');

const router = express.Router();

router.get('/', (req, res) => {
    Tweet.find(req.query).then(data => res.json(data))
});

router.post('/', (req, res) => {
    const tweet = new Tweet(req.body);

    console.log(req.body);

    tweet.save()
        .then(data => res.status(201).send(data))
        .catch(error => {
            if (error.name === 'ValidationError') {
                res.status(400).json(error.errors);
            }else {
                res.sendStatus(500);
            }
        });
});

module.exports = router;
