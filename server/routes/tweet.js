const express = require('express');
const Tweet = require('../models/tweet');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  Tweet.find(req.query).sort({ createdAt: 'desc' }).populate('user').then(data => res.json(data))
});

// /tweets/update-likes
router.patch("/update-likes", (req, res) => {
  Tweet.findById(req.body.tweetId).then((tweet) => {
    if (tweet) {
      User.findOne({ email: req.user.email }).then((user) => {
        var isInArray = tweet.likes.some(function (like) {
          return like.equals(user._id);
        });

        if (!isInArray) {
          tweet.likes.push(user);
          res.status(200).json({ status: true, tweet: tweet });
          tweet.save();
        } else {
          tweet.likes.pull(user);
          tweet.save();
          res.status(200).json({ status: false, tweet: tweet });
        }
      }).catch(error => {
        console.log("Search User", error);
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(500).send('Tweet not found');
    }
  }).catch(error => {
    console.log("Search Tweet", error);
    res.sendStatus(500);
  })
});

// /tweets
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
        console.log("ERROR ==>", error);
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
