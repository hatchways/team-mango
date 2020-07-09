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
      feedback: String
      //feedback: { type: Schema.Types.ObjectId, ref: "Feedback" },
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
