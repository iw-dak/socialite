const createToken = require("../lib/auth").createToken;
const express = require("express");
const User = require("../models/user");
const Tweet = require('../models/tweet');
const faker = require("faker");
faker.locale = 'fr';
const router = express.Router();

router.post("/login", (req, res) => {
  User.login(req.body.email, req.body.password)
    .then(user => {
      const token = createToken({
        firstName: user.firstname,
        email: user.email
      });

      res.status(201).send({
        user: user,
        token: token
      });
    })
    .catch(error => {
      console.log(error);
      if (error === 'User not found') {
        res.status(400).send("Oups, il semble que vous n'êtes pas encore inscrits");
      } else if (error === 'Wrong password') {
        res.status(400).send("Mot de passe incorrect");
      }
      res.status(400).send("Invalid token");
    });

  console.log("Login...");
});

router.post("/register", (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    termsAccepted: true,
    termsAcceptedDate: new Date()
  });

  user.register().then(data => {
    const token = createToken({
      firstName: data.firstname,
      email: data.email
    });

    res.status(201).send({
      user: user,
      token: token
    });

  }).catch(error => {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).send("L'adresse email existe déjà pour un autre compte");
    } else {
      res.status(400).send("Une erreur inconnu s'est produite");
    }
  });

  console.log("Register...");
});

router.post("/seeds", async (req, res) => {
  var i, j, err = false;

  // users
  for (i = 0; i < 5; i++) {
    let user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'admin',
      image: faker.image.avatar(),
      termsAccepted: true,
      termsAcceptedDate: new Date()
    });

    // tweets
    for (j = 0; j < 20; j++) {
      let tweet = new Tweet({
        text: faker.lorem.sentence(),
        user: user
      });

      await tweet.save();
      user.tweets.push(tweet);
    }

    try {
      await user.save();
    } catch (e) {
      console.log(e.toString());
    };
  }

  if (err) {
    res.status(400).send("Une erreur inconnu s'est produite");
  } else {
    res.send('Database seeded!');
  }
});

module.exports = router;
