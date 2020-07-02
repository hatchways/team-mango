const InterviewModel = require("./interview.model");
const UserModel = require("../models/usermodel");

const questionService = require("../question/question.service");

module.exports = {
    createInterview,
    updateInterview
}

async function createInterview(userId, difficulty) {
    let interview = new InterviewModel();
    let participant = await UserModel.findById(userId);
    let question = await questionService.findARandomQuestionByDifficulty(difficulty);
    interview.participants.push(participant);
    interview.questions.push(question);
    await interview.save();

    return interview;
}

async function updateInterview(userId, difficulty, interviewId) {
    let updatedInterview = await InterviewModel
        .findById(interviewId)
        .populate('participants')
        .populate('questions');
    
    let participant = await UserModel.findById(userId);
    let question = updatedInterview.questions[0];
    let randomQuestion = await questionService.findARandomQuestionByDifficulty(difficulty, question._id);

    updatedInterview.participants.push(participant);
    updatedInterview.questions.push(randomQuestion);
    updatedInterview.save();
 
    return updatedInterview;
}