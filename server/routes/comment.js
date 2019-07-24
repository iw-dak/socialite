const express = require('express');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

// /comments
router.post('/', (req, res) => {
  User.findOne({ email: req.user.email }).then((user) => {

    Tweet.findById(req.body.tweet).populate('user').then((tweet) => {
      const comment = new Comment({
        text: req.body.text,
        user: user,
        tweet: tweet
      });

      comment.save()
        .then(data => {
          tweet.comments.push(comment);
          tweet.save();
          res.status(201).send(comment)
        }).catch(error => {
          if (error.name === 'ValidationError') {
            res.status(400).json(error.errors);
          } else {
            res.sendStatus(500);
          }
        });
    });
  }).catch((error) => {
    console.log("Error", error);
    res.sendStatus(500);
  });
});

module.exports = router;
