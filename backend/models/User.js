const mongoose = require('mongoose');
const { compareSync } = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesNotExist({ email }),
        message: 'Email already exists',
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
