const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewAnswerSchema = new Schema({
    type: String,
    enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
  });

let InterviewSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      question: { type: Schema.Types.ObjectId, ref: "Question" },
      feedback: { 
        overallScore: {
            //Overall, how well did this person do in the interview
            type: Number,
            min: 0,
            max: 10,
          },
          review: {
            //Submit a review of the candidate in the following catergories
            communicationSkills: ReviewAnswerSchema,
            codeEfficiency: ReviewAnswerSchema,
            speed: ReviewAnswerSchema,
            debuggingSkills: ReviewAnswerSchema,
            problemSolvingSkills: ReviewAnswerSchema,
          },
          strengths: {
            //What  are some things this candidate did well (the more specific the better)
            type: String,
          },
          weaknesses: {
            //What are some things this candidate can improve on (the more specific the better)
            type: String,
          },
          recommendations: {
            //Any recommendations on resources that can help this candidate improve?
            type: String,
          },
          anythingElse: {
            //Anything else?
            type: String,
          },
      },
    },
  ],
  difficulty: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner",
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
