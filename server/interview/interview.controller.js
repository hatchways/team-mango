const express = require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const interviewService = require('./interview.service');

//Create interview
router.post('/', verifyToken, async function(req, res) {
    const postBody = req.body;
    const user = postBody.user;
    const difficulty = postBody.difficulty;

    let interview = await interviewService.createInterview(user, difficulty);

    res.json(interview);
});

//Update interview
router.put('/*', verifyToken, async function(req, res) {
    const postBody = req.body;
    const user = postBody.user;
    let interviewId = req.path.replace(/\//g, '');
    await interviewService.addParticipantToAnInterview(user, interviewId)
        .then(interview => res.json(interview))
        .catch(err => res.status(500).json({ Error: err}));
});


module.exports = router;