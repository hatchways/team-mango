const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken");
const questionService = require("./question.service");

//Get a question by id
router.get("/:id", verifyToken, async function (req, res) {
  const questionId = req.params.id;

  await questionService
    .getQuestionById(questionId)
    .then((question) => res.json(question))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

module.exports = router;
