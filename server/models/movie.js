const db = require('../lib/db');
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    createdAt: Date,
    year: {
        type: Number,
        min: 1900
    },
    category: {
        type: String,
        enum: ['Horror', 'SF', 'Action', 'Drama']
    }
});

MovieSchema.methods.onScreen = function() {
    return Date.now() > new Date(`${this.year}-01-01`);
}

MovieSchema.pre('save', function(next) {
    console.log(`Saving ${this.title} ...`);
    next();
});

MovieSchema.post('save', function(movie) {
    console.log(`${movie.title} saved.`);
});

module.exports = db.model('Movie', MovieSchema);
