const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken");
const interviewService = require("./interview.service");

//Create interview
router.post("/", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = postBody.user;
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
  const postBody = req.body;
  const user = postBody.user;
  let interviewId = req.path.replace(/\//g, "");

  await interviewService
    .addParticipantToAnInterview(user, interviewId)
    .then((interview) => res.json(interview))
    .catch((err) => res.status(500).json({ Error: err.message }));
});

//Get all completed interviews
router.get("/completed", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = postBody.user;
  const interviews = await interviewService.getAllCompletedInterviewsOfAUser(
    user
  );

  res.json(interviews);
});

//Get all ongoing or upcoming interviews
router.get("/ongoing", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = postBody.user;
  const interviews = await interviewService.getAllOngoingOrUpcomingInterviewsOfAUser(
    user
  );

  res.json(interviews);
});

module.exports = router;
