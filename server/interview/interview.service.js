const QuestionModel = require("../question/question.model");
const InterviewModel = require("./interview.model");
const UserModel = require("../models/usermodel");


module.exports = {
    createInterview
}

async function createInterview(userid, difficulty) {
    const firstParticipant = await UserModel.findById(userid);
    const interview = new InterviewModel();
    
    return interview.save();
}