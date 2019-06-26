const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/', {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    dbName: process.env.MONGODB_DBNAME,
    useNewUrlParser: true
});

// avoid index key error notice
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.connection;
