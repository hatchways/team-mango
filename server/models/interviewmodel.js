const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = require('./models/questionmodel');
let User = require('./model/usermodel.ts');

let InterviewSchema = new Schema({
    participants: [User],
    questions: [Question],
    difficulty: {
        type: String,
        required: true, 
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    }
});

module.exports = mongoose.model('Interview', InterviewSchema);