const QuestionModel = require("./question.model");

module.exports = {
    seedQuestions,
    findARandomQuestionByDifficulty
}

async function seedQuestions() {
    const question1 = new QuestionModel({title: "q1", description: "q1-description", difficulty: "Beginner"});
    const question2 = new QuestionModel({title: "q2", description: "q2-description", difficulty: "Intermediate"});
    const question3 = new QuestionModel({title: "q3", description: "q3-description", difficulty: "Advanced"});
    const question4 = new QuestionModel({title: "q4", description: "q4-description", difficulty: "Expert"});
    const question5 = new QuestionModel({title: "q5", description: "q5-description", difficulty: "Beginner"});
    const question6 = new QuestionModel({title: "q6", description: "q6-description", difficulty: "Intermediate"});
    const question7 = new QuestionModel({title: "q7", description: "q7-description", difficulty: "Advanced"});
    const question8 = new QuestionModel({title: "q8", description: "q8-description", difficulty: "Expert"});
    const question9 = new QuestionModel({title: "q9", description: "q9-description", difficulty: "Beginner"});
    const question10 = new QuestionModel({title: "q10", description: "q10-description", difficulty: "Intermediate"});
    const question11 = new QuestionModel({title: "q11", description: "q11-description", difficulty: "Advanced"});
    const question12 = new QuestionModel({title: "q12", description: "q12-description", difficulty: "Expert"});

    const res = await QuestionModel.insertMany([question1, question2, question3, question4, question5, question6, 
        question7, question8, question9, question10, question11, question12]);
    return res;
}

async function findARandomQuestionByDifficulty(difficulty, excludeQuestionId) {
    let randomQuestion;
    let random = 0;

    let query = {'difficulty': difficulty};
    if (excludeQuestionId) query._id = {$ne: excludeQuestionId}

    await QuestionModel
        .find(query)
        .countDocuments({}, (err, count) => {
            random = Math.floor(Math.random() * count);
        })
        .cursor()
        .eachAsync(async function(doc, i) {
            if (i === random) {
                randomQuestion = doc;
            }
        });

    return randomQuestion;
}