const express = require("express");
const router = express.Router();
const verifyToken = require('../_helpers/verifyToken');

router.get("/welcome",verifyToken, function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
