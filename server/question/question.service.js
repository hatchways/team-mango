const db = require("../helpers/db");

const Question = db.Question;

module.exports = {
  findARandomQuestionByDifficulty,
  getQuestionById,
};

async function findARandomQuestionByDifficulty(
  difficulty,
  excludedQuestionIDs
) {
  let query = {
    difficulty: difficulty,
    random: { $gte: Math.random() },
  };
  let numberOfExcludedQuestions = 0;
  if (excludedQuestionIDs && excludedQuestionIDs.length > 0) {
    query._id = { $nin: excludedQuestionIDs };
    numberOfExcludedQuestions = excludedQuestionIDs.length;
  }

  let randomQuestion;
  let totalNoOfQuestions = await Question.countDocuments({
    difficulty: difficulty,
  });
  if (numberOfExcludedQuestions === totalNoOfQuestions)
    throw Error(
      "You have attempted all the questions in this difficulty level"
    );
  do {
    query.random = { $gte: Math.random() };
    randomQuestion = await Question.findOne(query);
  } while (randomQuestion == null);

  return randomQuestion;
}

async function getQuestionById(id) {
  const question = await Question.findById(id).catch((err) => {
    throw Error("Could not find a question with that id");
  });
  return question;
}
