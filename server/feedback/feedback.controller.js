const express = require('express');
const router = express.Router();

const feedbackService = require('./feedback.service');
const verifyToken = require('../helpers/verifyToken');

//Get feedback
router.get('/:interviewId', async function(req, res) {
    const postBody = req.body;
    //const user = postBody.user;
    const interviewId = req.params.interviewId;
    const user ={ _id: '5efe16473390ba5f29baae87'};

    await feedbackService.getFeedback(user._id, interviewId)
    .then(feedback => res.json(feedback))
    .catch(err => res.status(500).json({Error: err.message}));
});

//Create feedback
router.post('/:userId/:interviewId', async function(req, res) {
    const postBody = req.body;
    //const user = postBody.user;
    const interviewId = req.params.interviewId;
    const userId = req.params.userId;
    const user ={ _id: '5efe16473390ba5f29baae87'};

    await feedbackService.createFeedback(userId, interviewId, postBody)
    .then(feedback => res.json(feedback))
    .catch(err => res.status(500).json({Error: err.message}));
});

module.exports = router;