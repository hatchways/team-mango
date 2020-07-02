const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
=======
let Question = require('../question/question.model');
let User = require('../models/usermodel');

>>>>>>> 35e79c09b1a0f20b0124a62cde74a80a3350296c
let InterviewSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Interview', InterviewSchema);