const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // this.admin = true;
  next();
});

// fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {
//     // console.log('new user was created $ saved', doc);

//     next();
// });

// fire a function before doc updateOne to db
// userSchema.pre('updateOne', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error('incorrect password!!');
  }
  throw Error('incorrect email!!');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
