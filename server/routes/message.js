const express = require('express');
const User = require('../models/user');
const Message = require('../models/message');

const router = express.Router();

router.get('/', (req, res) => {
  Message.find(req.query).sort({ createdAt: 'desc' }).populate('userTo').populate('userFrom').then(data => res.json(data))
});

router.get('/current', (req, res) => {

});

// /messages
router.post('/', (req, res) => {
  User.findOne({ email: req.user.email }).then((userFrom) => {
    User.findById(req.body.userTo).then((userTo) => {
      const message = new Message({
        content: req.body.message,
        userFrom: userFrom,
        userTo: userTo
      });

      message.save()
        .then(data => {
          userFrom.messagesFrom.push(message);
          userFrom.save();

          userTo.messagesTo.push(message);
          userTo.save();

          res.status(201).send(data);
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
