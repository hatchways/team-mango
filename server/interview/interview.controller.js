<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const interviewService = require('./interview.service');
=======
const express = require("express");
const router = express.Router();

const interviewService = require("./interview.service");
>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c

//Create interview
router.post('/', async function(req, res) {
    const postBody = req.body;
    const userId = postBody.userId;
    const difficulty = postBody.difficulty;
    const interviewId = postBody.interviewId;

    if (interviewId) {
        interviewService.updateInterview(userId, difficulty, interviewId)
            .then(interview => {
                res.json(interview);
            });   
    } else {
        interviewService.createInterview(userId, difficulty)
            .then(interview => {
                res.json(interview);
            }); 
    }
});

module.exports = router;