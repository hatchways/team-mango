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
    }
});

module.exports = mongoose.model('Question', QuestionSchema);