const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ error: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.json(user);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id).then(user => {
    res.json(user);
  })  
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash })
      .then((newUser) => res.status(201).json({ data: newUser }))
      .catch((err) => res.status(400).send({ error: err.message }));
  });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const newAvatar = req.body;
  User.findByIdAndUpdate(userId, newAvatar, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((avatar) => {
      if (!avatar) {
        const error = new Error("Avatar not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(avatar);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {      
      const token = jwt.sign(
        { _id: user._id , test: 'hooa'},
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );

      res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
