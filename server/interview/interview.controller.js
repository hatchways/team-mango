const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken");
const interviewService = require("./interview.service");

//Create interview
router.post("/", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  const difficulty = postBody.difficulty;

  await interviewService
    .createInterview(user, difficulty)
    .then((interview) => {
      res.json(interview);
    })
    .catch((err) => res.status(500).json({ Error: err.message }));
});

//Update interview
router.put("/*", verifyToken, async function (req, res) {
  const user = req.user;
  let interviewId = req.path.replace(/\//g, "");

  await interviewService
    .addParticipantToAnInterview(user, interviewId)
    .then((interview) => res.json(interview))
    .catch((err) => res.status(500).json({ Error: err }));
});

//Get feedback
router.get("/:interviewId/feedback", async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  const interviewId = req.params.interviewId;

  await interviewService
    .getFeedback(user._id, interviewId)
    .then((feedback) => res.json(feedback))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

//Create feedback
router.post("/feedback/:interviewId", async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  const userId = user._id;
  const interviewId = req.params.interviewId;

  await interviewService
    .createFeedback(userId, interviewId, postBody)
    .then((feedback) => res.json(feedback))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

module.exports = router;
