const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(({ _id }) => Card.findById(_id).populate(["owner", "likes"]))
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send({ status: true }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => res.send(card));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then((card) => res.send(card));
};
