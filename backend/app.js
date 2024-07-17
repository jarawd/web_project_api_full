const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const { errorLogger, requestLogger } = require("./middlewares/logger");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const cors = require("cors");

require("dotenv").config();

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

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

app.use(auth);

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.use("/", usersRoute);

app.use(
  "/",
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  cardsRoute
);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error del servidor!" : message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
