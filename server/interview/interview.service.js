const QuestionModel = require("../question/question.model");
const InterviewModel = require("./interview.model");
const UserModel = require("../models/usermodel");
const interviewModel = require("./interview.model");

const questionService = require("../question/question.service");

module.exports = {
    createInterview
}

async function createInterview(userid, difficulty, interviewId) {
    const participant = await UserModel.findById(userid);
    let interview;
    let question;
    if (interviewId) {
        //User joining an interview
        interview = await InterviewModel.findById(interviewId);
        const excludeQuestion = await interview.findOne({}).populate('questions');
        console.log("Excluded question\n" + excludeQuestionId);
        question = findARandomQuestionByDifficulty(difficulty, excludeQuestion._id);
    }
    else {
        //User creating an interview
        interview = new InterviewModel();
    }
    interview.participants.push(participant);
    
    return interview.save();
}

/*
let InterviewSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    startTime: {
        type: Date
    }
});
*/