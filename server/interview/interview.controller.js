const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken");
const interviewService = require("./interview.service");
const { NotExtended } = require("http-errors");

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
    .catch((err) => {
      res.status(500).json({ Error: err.message });
    });
});

//Remove Interview
router.post("/remove", verifyToken, async function (req, res) {
  const removeID = req.body.id;
  const userID = req.user._id;
  await interviewService
    .removeInterview(userID, removeID)
    .then((response) => res.status(200).json("deleted"))
    .catch((err) => res.status(401).json(err));
});

//Check if the user is the owner
router.get("/isowner/:id", verifyToken, async function (req, res) {
  const userID = req.user._id;
  const interviewID = req.params.id;

  await interviewService
    .getInterview(interviewID)
    .then((interview) => {
      if (userID.toString() === interview.owner.toString())
        res.status(200).json("true");
      else res.status(200).json("false");
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

//Update interview
router.put("/*", verifyToken, async function (req, res) {
  const postBody = req.body;
  const user = req.user;
  let interviewId = req.path.replace(/\//g, "");

  await interviewService
    .addParticipantToAnInterview(user, interviewId)
    .then((interview) => res.status(200).json(interview))
    .catch((err) => res.status(500).json({ Error: err.message }));
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

module.exports = router;
