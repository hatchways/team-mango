const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true, 
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    }
});

module.exports = mongoose.model('Question', QuestionSchema);