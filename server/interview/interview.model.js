const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InterviewSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Interview', InterviewSchema);