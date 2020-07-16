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
};
/**
 * returns interview by id
 *
 */
async function getInterview(interViewid) {
  const interview = await Interview.findById(interViewid);
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

  let excludedQuestionIDs = user.questions;
  let question = await questionService.findARandomQuestionByDifficulty(
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
    let interview = await Interview.findOne({ _id: interviewId });

    //Checking if this interview is completed
    if (interview.endTime == undefined) break;

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
 * Returns a numerical score for review points
 */
function convertReviewPointsToAScore(reviewPoint) {
  let score;
  switch (reviewPoint) {
    case "needs improvement":
      score = 1;
      break;
    case "satisfactory":
      score = 2;
      break;
    case "good":
      score = 3;
      break;
    case "great":
      score = 4;
      break;
    case "excellent":
      score = 5;
      break;
  }
  return score;
}
