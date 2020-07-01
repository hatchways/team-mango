const QuestionModel = require("./question.model");

module.exports = {
    seedQuestions,
    clearAllExistingQuestions
}

function seedQuestions() {
    const question1 = new QuestionModel({title: "q1", description: "q1-description", difficulty: "Medium"});
    const question2 = new QuestionModel({title: "q2", description: "q2-description", difficulty: "Easy"});
    const question3 = new QuestionModel({title: "q3", description: "q3-description", difficulty: "Hard"});
    const question4 = new QuestionModel({title: "q4", description: "q4-description", difficulty: "Medium"});
    const question5 = new QuestionModel({title: "q5", description: "q5-description", difficulty: "Easy"});
    const question6 = new QuestionModel({title: "q6", description: "q6-description", difficulty: "Hard"});

    QuestionModel.insertMany([question1, question2, question3, question4, question5, question6]);
}