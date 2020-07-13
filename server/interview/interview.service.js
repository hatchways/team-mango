const db = require("../helpers/db");

const questionService = require("../question/question.service");
const userService = require("../users/user.service");

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
  const interviewIds = user.interviews;

  let relevantInterviewInformation = await retrieveRelevantInterviewInformation(
    user._id,
    interviewIds
  );

  //Sorting latest first, based on interview end time
  relevantInterviewInformation.sort((e1, e2) =>
    e1.endTime < e2.endTime ? 1 : e2.endTime < e1.endTime ? -1 : 0
  );
  return relevantInterviewInformation;
}

/**
 * Returns an array of interview ids of ongoing interviews of a user.
 *
 */
async function getAllOngoingOrUpcomingInterviewsOfAUser(user) {
  const interviewIds = user.interviews;
  const completedInterviewIds = await filterCompleteInterviewIdsOnly(
    interviewIds
  );
  const ongoingOrUpcomingInterviewIds = interviewIds.filter(
    (interviewId) => !completedInterviewIds.includes(interviewId)
  );

  return ongoingOrUpcomingInterviewIds;
}

/**
 * Returns only the completed interviews from a list of interviews.
 *
 */
async function filterCompleteInterviewIdsOnly(interviewIds) {
  let filteredInterviewIds = [];
  for (let i = 0, len = interviewIds.length; i < len; i++) {
    const count = await Interview.countDocuments({
      _id: interviewIds[i],
      endTime: { $exists: true },
    });
    if (count == 1) filteredInterviewIds.push(interviewIds[i]);
  }
  return filteredInterviewIds;
}

/**
 * Returns the relevant interview details for a user like  interview id, owner, difficulty,
 * question, coding rating, communication rating and feedback from a list of interviews.
 */
async function retrieveRelevantInterviewInformation(userId, interviewIds) {
  let relevantDetails = [];

  for (let i = 0, len = interviewIds.length; i < len; i++) {
    const interviewId = interviewIds[i];
    let interview = await Interview.findOne({
      _id: interviewId,
      endTime: { $exists: true },
    });

    //Checking if this interview is completed
    if (interview === undefined || interview == null) break;

    //Adding details except feedbackReceived
    let details = {
      _id: interview._id,
      owner: interview.owner,
      difficulty: interview.difficulty,
      heldOnDate: interview.endTime,
      heldOnTime: interview.startTime,
      startTime: interview.startTime,
      endTime: interview.endTime,
    };

    const participants = interview.participants;
    //Adding feedback if it exists. Looping participants to find the users participant array position to retrieve feedback
    for (
      let j = 0, participantsLen = participants.length;
      j < participantsLen;
      j++
    ) {
      const participant = participants[j];
      //Checking whether it is users correct array position in participants
      if (participant.user.toString() == userId.toString()) {
        //Adding question
        details.question = participant.question;
        let feedbackReceived = participant.feedbackReceived;
        //Adding feedback if it exists
        if (feedbackReceived) {
          if (feedbackReceived.review) {
            let review = feedbackReceived.review;
            if (review.communicationSkills) {
              let score = convertReviewPointsToAScore(
                feedback.communicationSkills
              );
              if (score) details.communicationRating = score;
            }
            if (review.codeEfficiency) {
              let score = convertReviewPointsToAScore(feedback.codeEfficiency);
              if (score) details.codeEfficiency = score;
            }
          }
          details.feedbackReceived = feedbackReceived;
        }
        break;
      }
    }

    relevantDetails.push(details);
  }

  return relevantDetails;
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
