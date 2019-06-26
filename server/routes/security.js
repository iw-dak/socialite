const createToken = require("../lib/auth").createToken;
const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/login", (req, res) => {
  User.login(req.body.email, req.body.password)
    .then(user => {
      const token = createToken({
        firstName: user.firstname
      });

      res.status(201).send({ token });
    })
    .catch(error => {
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

    res.status(201).send({ token });

  }).catch(error => {
    res.status(400).send("[register] Invalid token");
  });

  console.log("Register...");
});

module.exports = router;
