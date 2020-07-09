const db = require("../helpers/db");

const interviewService = require("../interview/interview.service");
const userService = require("../users/user.service");

const Feedback = db.Feedback;

module.exports = {
  getFeedback,
  createFeedback
};

async function getFeedback(userId, interviewId) {
    console.log('in getFeedback');
  const interview = await interviewService
    .findById(interviewId)
    .catch((err) => {
      throw Error("Could not find interview");
    });

    console.log('Interview: ' + interview);
    const participants = interview.participants;
    let feedbackId;
    
    for (let i = 0, len = participants.length; i < len; i++) {
        const participant = participants[i];
        console.log('participant: ' + participant);
        const user = participant.user;
        if (user.toString() == userId.toString()) {
            feedbackId = participant.feedback;
        }
        break;
    }
    console.log('feedback: ' + feedbackId);
  return feedbackId;
}

async function createFeedback(userId, interviewId, feedbackBody) {
    let feedback = new Feedback();
    feedback.user = userId;
    feedback.interview = interviewId;

    if (feedbackBody.question1 !== undefined) {
        if (feedbackBody.question1 >= 0 && feedbackBody.question1 <= 10)
        feedback.question1 = feedbackBody.question1;
    }
    if (feedbackBody.question2) {
        let question2Body = {};
        let question2RequestBody = feedbackRequestBody.question2;
        if (question2Body.communicationSkills) question2Body.communicationSkills = question2RequestBody.communicationSkills;
        if (question2Body.codeEfficiency) question2Body.codeEfficiency = question2RequestBody.codeEfficiency;
        if (question2Body.speed) question2Body.speed = question2RequestBody.speed;
        if (question2Body.debuggingSkills) question2Body.debuggingSkills = question2RequestBody.debuggingSkills;
        if (question2Body.problemSolvingSkills) question2Body.problemSolvingSkills = question2RequestBody.problemSolvingSkills;

        feedback.question2 = question2Body;
    }
    if (feedbackBody.question3) feedback.question3 = feedbackBody.question3;
    if (feedbackBody.question4) feedback.question4 = feedbackBody.question4;
    if (feedbackBody.question5) feedback.question5 = feedbackBody.question5;
    if (feedbackBody.question6) feedback.question6 = feedbackBody.question6;

    let feedback = await feedback.save().catch(err => { throw Error('Error in saving feedback')});

    const user = await userService.getById(userId);
    const interview = await interviewService.findById(interviewId);
    const participants = interview.participants;

    for (let i = 0, len = participants.length; i < len; i++) {
        const participant = participants[i];
        const user = participant.user;
        if (user.toString() == userId.toString()) {
            user.feedback = feedback._id; 
        }
        break;
    }

    interview = await interview.save();

    return {feedback: feedback, interview: interview};
}
