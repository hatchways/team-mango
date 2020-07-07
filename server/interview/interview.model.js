const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      codingRating: { type: Number, min: 0, max: 5 },
      communicationRating: { type: Number, min: 0, max: 5 },
      feedback: String,
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
  statTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Interview", InterviewSchema);
