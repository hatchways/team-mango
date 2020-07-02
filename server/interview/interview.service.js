const db = require('../helpers/db');

const questionService = require('../question/question.service');
const userService = require('../users/user.service');

const Interview = db.Interview;

module.exports = {
    createInterview,
    updateInterview
}

async function createInterview(userId, difficulty) {
    let interview = new Interview();
    let participant = await userService.getById(userId);
    let question = await questionService.findARandomQuestionByDifficulty(difficulty);
    interview.participants.push(participant);
    interview.questions.push(question);
    await interview.save();

    return interview;
}

async function updateInterview(userId, difficulty, interviewId) {
    let updatedInterview = await Interview
        .findById(interviewId)
        .populate('participants')
        .populate('questions');
    
    let participant = await userService.getById(userId);
    let question = updatedInterview.questions[0];
    let randomQuestion = await questionService.findARandomQuestionByDifficulty(difficulty, question._id);

    updatedInterview.participants.push(participant);
    updatedInterview.questions.push(randomQuestion);
    updatedInterview.save();
 
    return updatedInterview;
}