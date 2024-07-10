const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/.test(
          v
        );
      },
      message: "Formato del enlace inválido",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
});

userSchema.static.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user)
        return new Promise.reject(new Error("Email or password incorrect!"));
      return bcrypt.compare(password, user.password).then((user) => {
        if (!user)
          return new Promise.reject(new Error("Password or Email incorrect!"));
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
