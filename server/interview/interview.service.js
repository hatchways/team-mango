const db = require("../helpers/db");
const mongoose = require("mongoose");
const questionService = require("../question/question.service");
const { User } = require("../helpers/db");

const Interview = db.Interview;

module.exports = {
  createInterview,
  addParticipantToAnInterview,
  getAllCompletedInterviewsOfAUser,
  getAllOngoingOrUpcomingInterviewsOfAUser,
  removeInterview,
  getInterview,
  endInterview,
  createFeedback,
  getFeedbackReceived,
  getFeedbackGiven,
  findById,
};
/**
 * returns interview by id
 *
 */
async function getInterview(interViewId) {
  const interview = await Interview.findById(interViewId);
  return interview;
}

async function endInterview(interViewId) {
  let interview = await Interview.findById(interViewId);
  let now = new Date();
  interview.endTime = now;
  [interview] = await Promise.all([interview.save()]);
  return interview;
}
/**
 *
 * Removes Interview
 */
async function removeInterview(userId, interviewid) {
  let interview = await Interview.findById(interviewid);
  let questionToRemove = interview.participants[0].question;
  await Interview.findByIdAndRemove(interviewid).catch((err) => {
    return `Failed to remove with error ${err}`;
  });

  await User.updateOne(
    { _id: userId },

    {
      $pull: {
        interviews: { $in: [interviewid] },
        questions: { $in: [questionToRemove] },
      },
    },

    { safe: true, multi: true },
    function (err, data) {
      if (err) {
        console.log(`Failed to remove with error ${err}`);
        return `Failed to remove with error ${err}`;
      }
    }
  );
}

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
  user.interviews.push({ _id: interview._id });
  user.questions.push(question);

  [interview, user] = await Promise.all([interview.save(), user.save()]);

  return interview;
}

/**
 * Returns the interview added with the new participant and a new question.
 *
 */
async function addParticipantToAnInterview(userId, interviewId) {
  let interview = await Interview.findById(interviewId);
  let user = await User.findById(userId);
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
  let now = new Date();
  interview.startTime = now;
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
      if (feedbackBody) {
        if (feedbackBody.overallScore) participant.feedbackReceived.overallScore = feedbackBody.overallScore;
        if (feedbackBody.review) participant.feedbackReceived.review = feedbackBody.review;
        if (feedbackBody.strengths) participant.feedbackReceived.strengths = feedbackBody.strengths;
        if (feedbackBody.weaknesses) participant.feedbackReceived.weaknesses = feedbackBody.weaknesses;
        if (feedbackBody.recommendations) participant.feedbackReceived.recommendations = feedbackBody.recommendations;
        if (feedbackBody.anythingElse) participant.feedbackReceived.anythingElse = feedbackBody.anythingElse;
      }
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
async function getFeedbackReceived(userId, interviewId) {
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
 * Returns the fedback given by this user to the other participant
 */
async function getFeedbackGiven(userId, interviewId) {
  const interview = await findById(interviewId).catch((err) => {
    throw Error("Could not find interview");
  });

  const participants = interview.participants;

  for (let i = 0, len = participants.length; i < len; i++) {
    const participant = participants[i];
    const user = participant.user;
    if (user.toString() != userId.toString()) {
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
