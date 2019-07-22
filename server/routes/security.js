const createToken = require("../lib/auth").createToken;
const express = require("express");
const User = require("../models/user");
const faker = require("faker");

const router = express.Router();

router.post("/login", (req, res) => {
  User.login(req.body.email, req.body.password)
    .then(user => {
      console.log(user);
      const token = createToken({
        firstName: user.firstname
      });

      res.status(201).send({
        user: user,
        token: token
      });
    })
    .catch(error => {
      if (error === 'User not found') {
        res.status(400).send("Oups, il semble que vous n'êtes pas encore inscrits");
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
    console.log(data)

    const token = createToken({
      firstName: data.firstname
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

router.post("/seeds", (req, res) => {
  console.log('===>');

  var i, err = false;
  for (i = 0; i < 5; i++) {
    let user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'admin',
      termsAccepted: true,
      termsAcceptedDate: new Date()
    });

    user.save();
  }

  if (err) {
    res.status(400).send("Une erreur inconnu s'est produite");
  } else {
    res.send('Database seeded!');
  }
});

module.exports = router;
