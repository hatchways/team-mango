const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken");

const { c, cpp, node, python, java } = require("compile-run");

router.post("/runcode", function (req, res) {
  const code = `print(0/0)`;
  let resultPromite = python.runSource(req.body.code);
  resultPromite
    .then((result) => {
      res.status(200).json(result.stdout);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
