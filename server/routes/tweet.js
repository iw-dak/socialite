const express = require('express');
const Tweet = require('../models/tweet');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  Tweet.find(req.query).sort({ createdAt: 'desc' }).populate('user').then(data => res.json(data))
});

router.post('/', (req, res) => {
  User.findOne({ email: req.user.email }).then((user) => {
    const tweet = new Tweet({
      text: req.body.text,
      user: user
    });

    tweet.save()
      .then(data => {
        user.tweets.push(tweet);
        user.save();
        res.status(201).send(data)
      })
      .catch(error => {
        if (error.name === 'ValidationError') {
          res.status(400).json(error.errors);
        } else {
          res.sendStatus(500);
        }
      });
  }).catch((error) => {
    console.log("Error", error);
    res.sendStatus(500);
  });
});

module.exports = router;
