const express = require("express");
const router = express.Router();

const interviewService = require("./interview.service");

//Create an interview
router.post('/', function(req, res) {
    const postBody = req.body;
    const userId = postBody.userId;
    const difficulty = postBody.difficulty;

    const interview = interviewService.createInterview(userId, difficulty);

    res.json(interview);
});

module.exports = router;