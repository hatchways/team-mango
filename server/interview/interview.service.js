const db = require('../helpers/db');

const questionService = require('../question/question.service');
const userService = require('../users/user.service');

const Interview = db.Interview;

module.exports = {
    createInterview,
    addParticipantToAnInterview
}

async function createInterview(user, difficulty) {
    let interview = new Interview();
    interview.owner = user;
    interview.difficulty = difficulty;

    let excludedQuestionIDs = user.questions;
    let question = await questionService.findARandomQuestionByDifficulty(difficulty, excludedQuestionIDs);

    interview.participants.push({ user: user, question: question });
    user.interviews.push(interview);
    user.questions.push(question);
    
    [interview, user] = await Promise.all([interview.save(), user.save()]);

    return interview;
}

async function addParticipantToAnInterview(user, interviewId) {
    let interview = await Interview.findById(interviewId);
    let difficulty = interview.difficulty;
    
    let excludedQuestionIDs = user.questions.concat(interview.participants[0].question);
    excludedQuestionIDs = excludedQuestionIDs.filter((item, index) => excludedQuestionIDs.indexOf(item) === index);
    let question = await questionService.findARandomQuestionByDifficulty(difficulty, excludedQuestionIDs).catch((err) => {
        throw err;
    });

    interview.participants.push({ user: user, question: question });
    user.interviews.push(interview);
    user.questions.push(question);
    
    [interview, user] = await Promise.all([interview.save(), user.save()]);

    return interview;
}