const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const { errorLogger, requestLogger } = require("./middlewares/logger");

app.use(express.static(path.join(__dirname, "/")));
require("dotenv").config();
const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");
app.use(express.json());

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.get("", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.use(auth);
app.use(
  "/",
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  cardsRoute
);
app.use("/", usersRoute);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Erro del servidor!" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
