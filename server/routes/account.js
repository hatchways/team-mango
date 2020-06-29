const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  body,
  validationResult,
  sanitizeParam,
} = require("express-validator/check");


router.post(
  "/signup",
  [
    body("firstName").isLength({ min: 3, max: 30 }).exists(),
    body("email").isEmail().normalizeEmail().exists(),
    body("lastName").isLength({ min: 3, max: 30 }).exists(),
    body("password")
      .isLength({ min: 6, max: 30 })
      .exists()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    res
      .status(201)
      .send({
        message: `Succesfully Created Account! ${firstName} ${lastName} ${password} ${email} `,
      });
  }
);

router.post("/signin", function (req, res, next) {
  const user = req.body.username;
  res.status(200).send({ message: `Kind of workingmadude ${user}` });
});

module.exports = router;
