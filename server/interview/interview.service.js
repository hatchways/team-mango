const db = require('../helpers/db');

const questionService = require('../question/question.service');
const userService = require('../users/user.service');

const Interview = db.Interview;

module.exports = {
    createInterview,
    addParticipantToAnInterview,
    getAllCompletedInterviewsForAUser
}

/**
 * Returns a newly created interview adding the creator as the owner and as a participant, 
 * adding a question for the user. The user will be added with information about the interview and question
 *
 * @param {User} user The user object from the database.
 * @param {String} difficulty Difficulty level of questions for the interview.
 * @return {Interview} interview Created interview object.
 */
async function createInterview(user, difficulty) {
    let interview = new Interview();
    interview.owner = user._id;
    interview.difficulty = difficulty;

    let excludedQuestionIDs = user.questions;
    let question = await questionService.findARandomQuestionByDifficulty(difficulty, excludedQuestionIDs);

    interview.participants.push({ user: user._id, question: question._id });
    user.interviews.push(interview._id);
    user.questions.push(question._id);
    
    [interview, user] = await Promise.all([interview.save(), user.save()]);

    return interview;
}

/**
 * Returns the interview added with the new participant and a new question.
 *
 * @param {User} user The user object from the database.
 * @param {String} interviewId The id of interview to add details to.
 * @return {Interview} interview Created interview object.
 */
async function addParticipantToAnInterview(user, interviewId) {
    let interview = await Interview.findById(interviewId);
    const participants = interview.participants;
    if (participants.length >= 2) throw Error('There is already two participants for this interview'); 
    let difficulty = interview.difficulty;
    
    let excludedQuestionIDs = user.questions.concat(interview.participants[0].question);
    //Removing duplicates from array
    excludedQuestionIDs = excludedQuestionIDs.filter((item, index) => excludedQuestionIDs.indexOf(item) === index);
    let question = await questionService.findARandomQuestionByDifficulty(difficulty, excludedQuestionIDs).catch((err) => {
        throw err;
    });

    interview.participants.push({ user: user._id, question: question._id });
    user.interviews.push(interview._id);
    user.questions.push(question._id);
    
    [interview, user] = await Promise.all([interview.save(), user.save()]);

    return interview;
}

/**
 * Returns all the completed interviews of a user.
 *
 * @param {String} userId Id of the user.
 * @return {Array<Interview>} Array of interviews of the user.
 */
async function getAllCompletedInterviewsForAUser(userId) {
    const user = await userService.getById(userId);
    let interviewsIds = user.interviews;
    //Only retaining completed interviews in the interviewIds array
    interviewsIds = await filterCompletedInterviews(interviewsIds);
    //Getting the relevant interview details of this user
    const relevantInterviewInformation = await getRelevantInterviewInformation(userId, interviewsIds);
    
    return relevantInterviewInformation;
}


/**
 * Returns only the completed interviews from a list of interviews.
 *
 * @param {Array<Interview>} interviews Array of interviews.
 * @return {Array<Interview>} Array of only the completed interviews or interviews with endTime defined.
 */
async function filterCompletedInterviews(interviews) {
    let filteredInterviews = [];
    for (let i = 0, len = interviews.length; i < len; i++) {
        const count =await Interview.countDocuments({_id: interviews[i], endTime: {$exists: true}});
        if (count == 1) filteredInterviews.push(interviews[i]);
    }
    return filteredInterviews;
}

async function getRelevantInterviewInformation(userId, interviewsIds) {
    let relevantDetails = [];

    for (let i = 0, len = interviewsIds.length; i < len; i++) {
        const interview = await Interview.findById(interviewsIds[i]);
        
        const participants = interview.participants;

        let details = {_id: interview._id, owner: interview.owner, difficulty: interview.difficulty};
        for (let j = 0, participantsLen = participants.length; j < participantsLen; j++) {
            const participant = participants[j];
            if (participant.user == userId) {
                details.question = participant.question;
                details.codingRating = participant.codingRating;
                details.communicationRating = participant.communicationRating;
                details.feedback = participant.feedback;
                break;
            }
        }

        relevantDetails.push(details);
    }

    return relevantDetails;
}