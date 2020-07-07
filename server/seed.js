/** 
 * To seed the database execute "npm run seed"
*/

const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, 
  useCreateIndex: true });

const Question = require('./question/question.model');

async function seedQuestions() {
    const question1 = new Question({title: 'q1', description: 'q1-description', difficulty: 'Beginner', random: Math.random()});
    const question2 = new Question({title: 'q2', description: 'q2-description', difficulty: 'Intermediate', random: Math.random()});
    const question3 = new Question({title: 'q3', description: 'q3-description', difficulty: 'Advanced', random: Math.random()});
    const question4 = new Question({title: 'q4', description: 'q4-description', difficulty: 'Expert', random: Math.random()});
    const question5 = new Question({title: 'q5', description: 'q5-description', difficulty: 'Beginner', random: Math.random()});
    const question6 = new Question({title: 'q6', description: 'q6-description', difficulty: 'Intermediate', random: Math.random()});
    const question7 = new Question({title: 'q7', description: 'q7-description', difficulty: 'Advanced', random: Math.random()});
    const question8 = new Question({title: 'q8', description: 'q8-description', difficulty: 'Expert', random: Math.random()});
    const question9 = new Question({title: 'q9', description: 'q9-description', difficulty: 'Beginner', random: Math.random()});
    const question10 = new Question({title: 'q10', description: 'q10-description', difficulty: 'Intermediate', random: Math.random()});
    const question11 = new Question({title: 'q11', description: 'q11-description', difficulty: 'Advanced', random: Math.random()});
    const question12 = new Question({title: 'q12', description: 'q12-description', difficulty: 'Expert', random: Math.random()});

    const res = await Question.insertMany([question1, question2, question3, question4, question5, question6, 
        question7, question8, question9, question10, question11, question12]);
        
    return res;
}

const connection = mongoose.connection;
connection
  .once('open', () => {
    connection.db.listCollections().toArray((err, collections) => {
      console.log("Connected to mongoDB");  
      collections.forEach(item => {
        if (item.name === 'questions') {
            connection.db.dropCollection('questions');
            console.log("Dropped documents in collection 'questions'");
        }
      });
      seedQuestions()
        .then((res) => {
            console.log("Successfully added seed data");
            connection.close();
        }); 
    });
  });

connection
  .once('disconnected', () => {
      console.log("Disconnected from MongoDB");
  });