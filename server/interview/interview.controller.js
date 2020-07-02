const express = require("express");
const router = express.Router();

const interviewService = require("./interview.service");

//Create an interview
router.post('/', async function(req, res) {
    const postBody = req.body;
    const userId = postBody.userId;
    const difficulty = postBody.difficulty;
    const interviewId = postBody.interviewId;

    const interview = await interviewService.createInterview(userId, difficulty, interviewId);

    res.json(interview);
});

module.exports = router;