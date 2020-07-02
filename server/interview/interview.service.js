const InterviewModel = require("./interview.model");
const UserModel = require("../models/usermodel");

const questionService = require("../question/question.service");

module.exports = {
    createInterview
}

async function createInterview(userId, difficulty, interviewId) {
    let interview;
    let participant;
    await UserModel
        .findById(userId, (err, result) => {
            if (err) throw Error('User not found');
            participant = result;
        }
    );
    if (interviewId) {
        //Existing interview
        InterviewModel
            .findById(interviewId)
            .populate('questions')
            .exec((err, item) => {
                interview = item;
                const question = interview.questions[0];
                questionService.findARandomQuestionByDifficulty(difficulty, question._id)
                    .then(randomQuestion => {
                        interview.participants.push(participant);
                        interview.questions.push(randomQuestion);
                        interview.save();
                    });
            });
    } else {
        //New interview
        interview = new InterviewModel();
        await questionService.findARandomQuestionByDifficulty(difficulty)
            .then(randomQuestion => {
                interview.participants.push(participant);
                interview.questions.push(randomQuestion);    
                interview.save();
            });
    }
    
    return interview;
}