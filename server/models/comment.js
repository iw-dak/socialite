const db = require('../lib/db');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
}, { timestamps: true });

CommentSchema.pre('save', function (next) {
    console.log(`Saving comment ${this.text} ...`);
    next();
});

CommentSchema.post('save', function (comment) {
    console.log(`${comment.text} saved.`);
});

module.exports = db.model('Comment', CommentSchema);
