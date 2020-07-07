const express = require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const interviewService = require('./interview.service');
const userService = require('../users/user.service');

//Create interview
router.post('/', async function(req, res) {
    const postBody = req.body;
    //const user = postBody.user;
    const user = await userService.getById('5efe16473390ba5f29baae87');
    // const difficulty = postBody.difficulty;
    const difficulty = 'Intermediate';

    await interviewService.createInterview(user, difficulty)
        .then(interview => {
            res.json(interview);
        })
        .catch(err => res.status(500).json({ Error: err.message}));
});

//Update interview
router.put('/*', async function(req, res) {
    const postBody = req.body;
    // const user = postBody.user;
    const userId = '5efe16473390ba5f29baae87';
    const user = await userService.getById(userId);
    let interviewId = req.path.replace(/\//g, '');

    await interviewService.addParticipantToAnInterview(user, interviewId)
        .then(interview => res.json(interview))
        .catch(err => res.status(500).json({ Error: err.message}));
});

//Get all interviews
router.get('/completed', async function(req, res) {
    const postBody = req.body;
    //const user = postBody.user;
    const userId = '5efe16473390ba5f29baae87';

    const interviews = await interviewService.getAllCompletedInterviewsForAUser(userId);

    res.json(interviews);
});

module.exports = router;