const QuestionModel = require("../models/questionmodel");
const InterviewModel = require("../models/interviewmodel");
const UserModel = require("../models/usermodel");

export default class InterviewService {
    async createInterview(userid) {
        const firstParticipant = await UserModel.findById(userid);
    }
}