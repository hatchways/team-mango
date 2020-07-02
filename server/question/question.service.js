const db = require('../helpers/db');

const Question = db.Question;

module.exports = {
    seedQuestions,
    findARandomQuestionByDifficulty
}

async function seedQuestions() {
    const question1 = new Question({title: 'q1', description: 'q1-description', difficulty: 'Beginner'});
    const question2 = new Question({title: 'q2', description: 'q2-description', difficulty: 'Intermediate'});
    const question3 = new Question({title: 'q3', description: 'q3-description', difficulty: 'Advanced'});
    const question4 = new Question({title: 'q4', description: 'q4-description', difficulty: 'Expert'});
    const question5 = new Question({title: 'q5', description: 'q5-description', difficulty: 'Beginner'});
    const question6 = new Question({title: 'q6', description: 'q6-description', difficulty: 'Intermediate'});
    const question7 = new Question({title: 'q7', description: 'q7-description', difficulty: 'Advanced'});
    const question8 = new Question({title: 'q8', description: 'q8-description', difficulty: 'Expert'});
    const question9 = new Question({title: 'q9', description: 'q9-description', difficulty: 'Beginner'});
    const question10 = new Question({title: 'q10', description: 'q10-description', difficulty: 'Intermediate'});
    const question11 = new Question({title: 'q11', description: 'q11-description', difficulty: 'Advanced'});
    const question12 = new Question({title: 'q12', description: 'q12-description', difficulty: 'Expert'});

    const res = await Question.insertMany([question1, question2, question3, question4, question5, question6, 
        question7, question8, question9, question10, question11, question12]);
        
    return res;
}

async function findARandomQuestionByDifficulty(difficulty, excludeQuestionId) {
    let randomQuestion;
    let random = 0;

    let query = {'difficulty': difficulty};
    if (excludeQuestionId) query._id = {$ne: excludeQuestionId}

    await Question
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