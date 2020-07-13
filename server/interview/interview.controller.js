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
      res.status(200).json(interview);
    })
    .catch((err) => res.status(500).json({ Error: err.message }));
});

//Update interview
router.put("/*", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  let interviewId = req.path.replace(/\//g, "");

  await interviewService
    .addParticipantToAnInterview(user, interviewId)
    .then((interview) => res.status(200).json(interview))
    .catch((err) => res.status(500).json({ Error: err }));
});

//Get all completed interviews
router.get("/completed", verifyToken, async function (req, res) {
  const user = req.user;
  await interviewService
    .getAllCompletedInterviewsOfAUser(user)
    .then((interviews) => res.status(200).json(interviews))
    .catch((err) => res.status(500).json(err.message));
});

//Get all ongoing or upcoming interviews
router.get("/ongoing", verifyToken, async function (req, res) {
  const user = req.user;
  const interviews = await interviewService
    .getAllOngoingOrUpcomingInterviewsOfAUser(user)
    .then((interviews) => res.status(200).json(interviews))
    .catch((err) => res.status(500).json(err.message));
});

//Get feedback of a user
router.get("/:interviewId/feedback", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  const interviewId = req.params.interviewId;

  await interviewService
    .getFeedback(user._id, interviewId)
    .then((feedback) => res.status(200).json(feedback))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

//Create feedback for the other user
router.post("/feedback/:interviewId", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  const userId = user._id;
  const interviewId = req.params.interviewId;

  await interviewService
    .createFeedback(userId, interviewId, postBody)
    .then((feedback) => res.status(200).json(feedback))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

module.exports = router;
