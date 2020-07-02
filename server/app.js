const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const interviewRouter = require("./interview/interview.controller");

const questionService = require("./question/question.service");
const { collection } = require("./models/usermodel");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
  //Adding sample questions after dropping "questions" collection if it already exists
  db.db.listCollections().toArray((err, collections) => {
    collections.forEach(item => {
      if (item.name === 'questions') db.db.dropCollection('questions');
    });
    questionService.seedQuestions()
      .then(() => {
        questionService.findARandomQuestionByDifficulty("Expert")
              .then(
                q => {
                  console.log("q1 in app.js\n" + q);
                  questionService.findARandomQuestionByDifficulty("Expert", q._id)
                    .then(
                      q2 => {
                        console.log("q2 in app.js\n" + q2);
                        
                      }
                    );
                }
              );
      })
      .catch(() => {
        console.log("some error occured app.js:50");
      });
  });
})

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/interviews", interviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
