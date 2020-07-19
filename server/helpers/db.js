const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,

});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  Question: require("../question/question.model"),
  Interview: require("../interview/interview.model"),
};
