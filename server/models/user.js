const db = require('../lib/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: false },
  bio: { type: String, required: false },
  image: { type: String, required: false },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  birthdate: { type: Date, required: false },
  termsAccepted: { type: Boolean, required: true },
  termsAcceptedDate: { type: Date, required: true },
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  this.username = '@' + this.firstname.toLowerCase() + '' + this.lastname.toLowerCase();
  let name = (User.capitalizeFirstLetter(this.firstname) + "+" + User.capitalizeFirstLetter(this.lastname)).replace(/\s/g, '');
  this.image = "https://ui-avatars.com/api/?name=" + name + "&size=512";
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(this.password, salt).then(hash => {
      this.password = hash;
      next();
    })
  });
  console.log(`Saving ${this.firstname} ...`);
});

UserSchema.methods = {
  register: function () {
    return this.save();
  }
}

UserSchema.virtual('fullname').get(function () {
  return User.capitalizeFirstLetter(this.firstname) + ' ' + Usre.capitalizeFirstLetter(this.lastname);
})

UserSchema.statics = {
  login: function (email, password) {
    return new Promise((resolve, reject) => {
      User.findOne({ 'email': email }).then(user => {
        if (!user) return reject('User not found')
        bcrypt.compare(password, `${user.password}`).then(res => res ? resolve(user) : reject('Wrong password'));
      })
    });
  },
  capitalizeFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

UserSchema.post('save', function (user) {
  console.log(`${user.firstname} ${user.lastname} saved.`);
});

const User = db.model('User', UserSchema);
module.exports = User;
