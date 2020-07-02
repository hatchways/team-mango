<<<<<<< HEAD
const db = require('../helpers/db');

const questionService = require('../question/question.service');
const userService = require('../users/user.service');

const Interview = db.Interview;
=======
const InterviewModel = require("./interview.model");
const UserModel = require("../models/usermodel");

const questionService = require("../question/question.service");
>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c

module.exports = {
    createInterview,
    updateInterview
}

async function createInterview(userId, difficulty) {
<<<<<<< HEAD
    let interview = new Interview();
    let participant = await userService.getById(userId);
=======
    let interview = new InterviewModel();
    let participant = await UserModel.findById(userId);
>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c
    let question = await questionService.findARandomQuestionByDifficulty(difficulty);
    interview.participants.push(participant);
    interview.questions.push(question);
    await interview.save();

    return interview;
}

async function updateInterview(userId, difficulty, interviewId) {
<<<<<<< HEAD
    let updatedInterview = await Interview
=======
    let updatedInterview = await InterviewModel
>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c
        .findById(interviewId)
        .populate('participants')
        .populate('questions');
    
<<<<<<< HEAD
    let participant = await userService.getById(userId);
=======
    let participant = await UserModel.findById(userId);
>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c
    let question = updatedInterview.questions[0];
    let randomQuestion = await questionService.findARandomQuestionByDifficulty(difficulty, question._id);

    updatedInterview.participants.push(participant);
    updatedInterview.questions.push(randomQuestion);
    updatedInterview.save();
 
    return updatedInterview;
}