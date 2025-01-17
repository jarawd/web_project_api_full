const usersRoute = require("express").Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

usersRoute.get("/users", getUsers);
usersRoute.get("/users/me", getCurrentUser);
usersRoute.patch("/users/me", updateProfile);
usersRoute.get("/users/:userId", getUserById);
usersRoute.patch("/users/me/avatar", updateAvatar);

module.exports = usersRoute;
