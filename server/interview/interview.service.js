const db = require("../helpers/db");

const questionService = require("../question/question.service");
const userService = require("../users/user.service");

const Interview = db.Interview;

module.exports = {
  createInterview,
  addParticipantToAnInterview,
  createFeedback,
  getFeedback,
  findById,
};

async function createInterview(user, difficulty) {
  let interview = new Interview();
  console.log(JSON.stringify(user));
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

async function addParticipantToAnInterview(user, interviewId) {
  let interview = await Interview.findById(interviewId);
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
 * Creates feedback from this user to the other participant
 */
async function createFeedback(userId, interviewId, feedbackBody) {
  let feedbackReceived = {};

  if (feedbackBody.overallScore !== undefined)
    feedbackReceived.overallScore = feedbackBody.overallScore;
  //Adding review to interview feedback
  if (feedbackBody.review) {
    let review = {};

    const communicationSkills = feedbackBody.review.communicationSkills;
    const codeEfficiency = feedbackBody.review.codeEfficiency;
    const speed = feedbackBody.review.speed;
    const debuggingSkills = feedbackBody.review.debuggingSkills;
    const problemSolvingSkills = feedbackBody.review.problemSolvingSkills;

    if (communicationSkills) review.communicationSkills = communicationSkills;
    if (codeEfficiency) review.codeEfficiency = codeEfficiency;
    if (speed) review.speed = speed;
    if (debuggingSkills) review.debuggingSkills = debuggingSkills;
    if (problemSolvingSkills)
      review.problemSolvingSkills = problemSolvingSkills;

    feedbackReceived.review = review;
  }
  if (feedbackBody.strengths)
    feedbackReceived.strengths = feedbackBody.strengths;
  if (feedbackBody.weaknesses)
    feedbackReceived.weaknesses = feedbackBody.weaknesses;
  if (feedbackBody.recommendations)
    feedbackReceived.recommendations = feedbackBody.recommendations;
  if (feedbackBody.anythingElse)
    feedbackReceived.anythingElse = feedbackBody.anythingElse;

  let interview = await findById(interviewId).catch((err) => {
    throw Error("Could not find interview");
  });
  const participants = interview.participants;
  for (let i = 0, len = participants.length; i < len; i++) {
    const participant = participants[i];
    const user = participant.user;
    //Current user giving to other interview participant
    if (user.toString() !== userId.toString()) {
      participant.feedbackReceived = feedbackReceived;
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
