const db = require('../lib/db');
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seen: { type: Boolean, default: false }
}, { timestamps: true });

MessageSchema.pre('save', function (next) {
    console.log(`Saving tweet ${this.content} ...`);
    next();
});

MessageSchema.post('save', function (message) {
    console.log(`${message.content} saved.`);
});

module.exports = db.model('Message', MessageSchema);
