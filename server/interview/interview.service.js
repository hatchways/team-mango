const db = require("../helpers/db");

const questionService = require("../question/question.service");
const userService = require("../users/user.service");

const Interview = db.Interview;

module.exports = {
  createInterview,
  addParticipantToAnInterview,
  getAllCompletedInterviewsOfAUser,
  getAllOngoingOrUpcomingInterviewsOfAUser,
};

/**
 * Returns a newly created interview adding the creator as the owner and as a participant,
 * adding a question for the user. The user will be added with information about the interview and question
 *
 */
async function createInterview(user, difficulty) {
  let interview = new Interview();
  interview.owner = user._id;
  interview.difficulty = difficulty;

  let excludedQuestionIDs = user.questions;
  let question = await questionService.findARandomQuestionByDifficulty(
    difficulty,
    excludedQuestionIDs
  );
  interview.participants.push({ user: user._id, question: question._id });
  user.interviews.push(interview._id);
  user.questions.push(question._id);

  [interview, user] = await Promise.all([interview.save(), user.save()]);

  return interview;
}

/**
 * Returns the interview added with the new participant and a new question.
 *
 */
async function addParticipantToAnInterview(user, interviewId) {
  let interview = await Interview.findById(interviewId);
  const participants = interview.participants;
  if (participants.length >= 2)
    throw Error("There is already two participants for this interview");
  let difficulty = interview.difficulty;

  let excludedQuestionIDs = user.questions.concat(
    interview.participants[0].question
  );
  //Removing duplicates from array
  excludedQuestionIDs = excludedQuestionIDs.filter(
    (item, index) => excludedQuestionIDs.indexOf(item) === index
  );
  let question = await questionService
    .findARandomQuestionByDifficulty(difficulty, excludedQuestionIDs)
    .catch((err) => {
      throw err;
    });

  interview.participants.push({ user: user._id, question: question._id });
  user.interviews.push(interview._id);
  user.questions.push(question._id);

  [interview, user] = await Promise.all([interview.save(), user.save()]);

  return interview;
}

/**
 * Returns all the relevant details of completed interviews of a user.
 *
 */
async function getAllCompletedInterviewsOfAUser(user) {
  const interviewsIds = user.interviews;
  const completedInterviewsIds = await filterCompleteInterviewsOnly(
    interviewsIds
  );
  const relevantInterviewInformation = await getRelevantInterviewInformation(
    user._id,
    completedInterviewsIds
  );

  return relevantInterviewInformation;
}

/**
 * Returns all the relevant details of ongoing interviews of a user.
 *
 */
async function getAllOngoingOrUpcomingInterviewsOfAUser(user) {
  const interviewsIds = user.interviews;
  const completedInterviews = await filterCompleteInterviewsOnly(interviewsIds);
  const ongoingOrUpcomingInterviewIds = interviewsIds.filter(
    (interview) => !completedInterviews.includes(interview)
  );
  const relevantInterviewInformation = await getRelevantInterviewInformation(
    user._id,
    completedInterviewsIds
  );

  return relevantInterviewInformation;
}

/**
 * Returns only the completed interviews from a list of interviews.
 *
 */
async function filterCompleteInterviewsOnly(interviews) {
  let filteredInterviews = [];
  for (let i = 0, len = interviews.length; i < len; i++) {
    const count = await Interview.countDocuments({
      _id: interviews[i],
      endTime: { $exists: true },
    });
    if (count == 1) filteredInterviews.push(interviews[i]);
  }
  return filteredInterviews;
}

/**
 * Returns the relevant interview details for a user like  interview id, owner, difficulty,
 * question, coding rating, communication rating and feedback from a list of interviews.
 */
async function getRelevantInterviewInformation(userId, interviewsIds) {
  let relevantDetails = [];

  for (let i = 0, len = interviewsIds.length; i < len; i++) {
    const interview = await Interview.findById(interviewsIds[i]);

    const participants = interview.participants;

    let details = {
      _id: interview._id,
      owner: interview.owner,
      difficulty: interview.difficulty,
    };
    for (
      let j = 0, participantsLen = participants.length;
      j < participantsLen;
      j++
    ) {
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
