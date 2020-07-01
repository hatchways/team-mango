const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = require('../question/question.model');
let User = require('../models/usermodel');

let InterviewSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Interview', InterviewSchema);