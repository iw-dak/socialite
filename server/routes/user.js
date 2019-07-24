const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
  User.find(req.query).populate('tweets').then(data => res.json(data));
});

// /user/random
router.get('/random', (req, res) => {
  // Get the count of all users
  User.countDocuments().then((count) => {
    // Get a random entry
    var random = Math.floor(Math.random() * count);

    // Again query all users but only fetch one offset by our random #
    User.findOne().skip(random).populate('tweets').then((user) => {
      res.status(200).json(user);
    }).catch(error => {
      res.sendStatus(500);
    });

  }).catch(error => {
    res.sendStatus(500);
  });
});

// user/follow
router.patch("/follow", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    User.findOne({ email: req.user.email }).then((follower) => {
      user.followers.push(follower);
      user.save();
      follower.following.push(user);
      follower.save();

      res.status(200).json({ user: user, follower: follower });
    }).catch(error => {
      res.sendStatus(500);
    });
  }).catch(error => {
    res.sendStatus(500);
  })
});

// user/unfollow
router.patch("/unfollow", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    User.findOne({ email: req.user.email }).then((follower) => {
      user.followers.pull(follower);
      user.save();
      follower.following.pull(user);
      follower.save();

      res.status(200).json({ user: user, follower: follower });
    }).catch(error => {
      res.sendStatus(500);
    });
  }).catch(error => {
    res.sendStatus(500);
  })
});

// user/1
router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).populate('tweets')
    .then(data => res.json(data))
    .catch(error => {
      console.log(error);
      if (error.name == "CastError") {
        res.status(422).json({ message: "Invalid id" });
      } else {
        res.sendStatus(500);
      }
    });
});

// user/1
router.put("/:id", (req, res) => {
  const user = new User({ _id: req.params.id });
  user.populate(res.body);
  user.save();
});

// /user
router.post("/", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(data => res.status(201).send(data))
    .catch(error => {
      if (error.name === "ValidationError") {
        res.status(400).json(error.errors);
      } else {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
