const db = require("../helpers/db");

const questionService = require("../question/question.service");

const Interview = db.Interview;

module.exports = {
  createInterview,
  addParticipantToAnInterview,
  getAllCompletedInterviewsOfAUser,
  getAllOngoingOrUpcomingInterviewsOfAUser,
  createFeedback,
  getFeedback,
  findById,
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

  const excludedQuestionIDs = user.questions;
  const question = await questionService.findARandomQuestionByDifficulty(
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

  const difficulty = interview.difficulty;

  let excludedQuestionIDs = user.questions.concat(
    interview.participants[0].question
  );
  //Removing duplicates from array
  excludedQuestionIDs = excludedQuestionIDs.filter(
    (item, index) => excludedQuestionIDs.indexOf(item) === index
  );
  const question = await questionService
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
  let interviews = await Interview.find({
    "participants.user": user._id,
    endTime: { $exists: true },
  });

  //Sorting latest first, based on interview end time
  interviews.sort((e1, e2) =>
    e1.endTime < e2.endTime ? 1 : e2.endTime < e1.endTime ? -1 : 0
  );

  return interviews;
}

/**
 * Returns an array of interview ids of ongoing interviews of a user.
 *
 */
async function getAllOngoingOrUpcomingInterviewsOfAUser(user) {
  const interviews = await Interview.find({
    "participants.user": user._id,
    endTime: { $exists: false },
  });
  const interviewIds = interviews.map((interview) => interview._id);
  return interviewIds;
}

/**
 * Creates feedback from this user to the other participant
 */
async function createFeedback(userId, interviewId, feedbackBody) {
  let interview = await findById(interviewId).catch((err) => {
    throw err;
  });

  const participants = interview.participants;
  for (let i = 0, len = participants.length; i < len; i++) {
    const participant = participants[i];
    const user = participant.user;
    //Current user giving to other interview participant
    if (user.toString() !== userId.toString()) {
      participant.feedbackReceived = feedbackBody;
      break;
    }
  }

  interview = await interview.save().catch((err) => {
    throw Error("Could not save interview");
  });

  return interview;
}

/**
 * Returns the fedback received by this user from the other participant
 */
async function getFeedback(userId, interviewId) {
  let feedbackReceived = {};
  const interview = await findById(interviewId).catch((err) => {
    throw Error("Could not find interview");
  });

  const participants = interview.participants;

  for (let i = 0, len = participants.length; i < len; i++) {
    const participant = participants[i];
    const user = participant.user;
    if (user.toString() == userId.toString()) {
      feedbackReceived = participant.feedbackReceived;
      break;
    }
  }
  return feedbackReceived;
}

/**
 * Returns the interview object using the id parameter
 */
async function findById(id) {
  const interview = await Interview.findById(id).catch((err) => {
    throw err;
  });
  return interview;
}
