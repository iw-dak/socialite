const db = require('../lib/db');
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  retweeters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

TweetSchema.methods.onScreen = function () {
  return Date.now() > new Date(`${this.year}-01-01`);
}

TweetSchema.pre('save', function (next) {
  console.log(`Saving tweet ${this.text} ...`);
  next();
});

TweetSchema.post('save', function (tweet) {
  console.log(`${tweet.title} saved.`);
});

module.exports = db.model('Tweet', TweetSchema);
