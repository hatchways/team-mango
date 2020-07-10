const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Beginner",
  },
  random: {
    //Added for efficient querying of random question
    type: Number,
    default: Math.random(),
  },
});

QuestionSchema.index({ random: 1 });

module.exports = mongoose.model("Question", QuestionSchema);
