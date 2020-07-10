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
