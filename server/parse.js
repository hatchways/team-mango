const mongoose = require("mongoose");
require("dotenv").config();

fs = require("fs");

mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const Question = require("./question/question.model");
const { title } = require("process");
const { time } = require("console");

let datastring = async function () {
  fs.readFile("./out.html", "utf8", async function (err, data) {
    if (err) {
      throw err;
    }
    const res = await parse(data).catch((err) => console.log(err));
    return res;
  });
};
async function parse(data) {
  const difficultyHard = ["Advanced", "Expert"];
  let datarr = data.split("<hr>");
  let resArray = await datarr.forEach(async (element) => {
    let titleTemp = element.match(
      /\*+\n*<div id="title">\n*.+\n*<\/div>\n*\*+/
    );
    let dif = element.match(/@+\n*<div id="dif">\n*.+\n*<\/div>\n*@+/);
    if (titleTemp && dif) {
      titleTemp = titleTemp.toString();
      dif = dif.toString();
      titleTemp = titleTemp.replace(/\*+\n*<div id="title">\n*/, "");
      dif = dif.replace(/@+\n*<div id="dif">\n*/, "");
      let title = titleTemp.replace(/\n*<\/div>\n*\*+/, "");
      let difNum = dif.replace(/\n*<\/div>\n*@+/, "");
      difNum = difNum.trim();
      desc = element.replace(/\*+\n*<div id="title">\n*.+\n*<\/div>\n*\*+/, "");
      desc = desc.replace(/@+\n*<div id="dif">\n*.+\n*<\/div>\n*@+/, "");
      if (title && desc && difNum) {
        console.log(difNum);
        let difficulty = " ";
        if (difNum == "1") {
          difficulty = "Beginner";
        } else if (difNum == "2") {
          difficulty = "Intermediate";
        } else {
          difficulty =
            difficultyHard[Math.floor(Math.random() * difficultyHard.length)];
        }

        let res = new Question({
          title: title,
          description: desc,
          difficulty: difficulty,
          random: Math.random(),
        });

        [res] = await Promise.all([res.save()]);

        return res;
      }
    }
  });

  return resArray;
}

const connection = mongoose.connection;
connection.once("open", () => {
  connection.db.listCollections().toArray((err, collections) => {
    console.log("Connected to mongoDB");
    collections.forEach((item) => {
      if (item.name === "questions") {
        connection.db.dropCollection("questions");
        console.log("Dropped documents in collection 'questions'");
      }
    });
    datastring()
      .then((res) => {
        console.log(res);
        //Closing connection breaks the code
      })
      .catch((err) => console.log(err));
  });
});

connection.once("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
