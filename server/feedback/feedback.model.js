const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question2AnswerSchema = new Schema({
  type: String,
  enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
});

const FeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  interview: {
    type: Schema.Types.ObjectId,
    ref: "Interview",
  },
  question1: {
    //Overall, how well did this person do in the interview
    type: Number,
    min: 0,
    max: 10,
  },
  question2: {
    //Submit a review of the candidate in the following catergories
    communicationSkills: Question2AnswerSchema,
    codeEfficiency: Question2AnswerSchema,
    speed: Question2AnswerSchema,
    debuggingSkills: Question2AnswerSchema,
    problemSolvingSkills: Question2AnswerSchema,
  },
  question3: {
    //What  are some things this candidate did well (the more specific the better)
    type: String,
  },
  question4: {
    //What are some things this candidate can improve on (the more specific the better)
    type: String,
  },
  question5: {
    //Any recommendations on resources that can help this candidate improve?
    type: String,
  },
  question6: {
    //Anything else?
    type: String,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
