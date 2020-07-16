const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  overallScore: {
    //Overall, how well did this person do in the interview
    type: Number,
    min: 0,
    max: 10,
  },
  review: {
    communicationSkills: {
      type: String,
      enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
    },
    codeEfficiency: {
      type: String,
      enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
    },
    speed: {
      type: String,
      enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
    },
    debuggingSkills: {
      type: String,
      enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
    },
    problemSolvingSkills: {
      type: String,
      enum: ["needs improvement", "satisfactory", "good", "great", "excellent"],
    },
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
    type: String,
  },
});

const InterviewSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", index: true },
      question: { type: Schema.Types.ObjectId, ref: "Question" },
      feedbackReceived: FeedbackSchema,
    },
  ],
  difficulty: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner",
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
