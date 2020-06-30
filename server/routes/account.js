const express = require("express");
const router = express.Router();
const userservice = require('../users/user.service');
const verifyToken = require('../_helpers/verifyToken');

const {
  body,
  validationResult,
  sanitizeParam,
} = require("express-validator");


router.post("/signup",
  [
    body("first_name").isLength({ min: 3, max: 30 }).exists(),
    body("email").isEmail().normalizeEmail().exists(),
    body("last_name").isLength({ min: 3, max: 30 }).exists(),
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

    const { first_name, last_name, email, password } = req.body;

    userservice.create({ first_name, last_name, email, password })
    .then(() => res.status(201).send({message: 'Succesfully Registered'}))
    .catch(err => next(err));


  }
);

router.post("/signin",
[
  body("email").isEmail().normalizeEmail().exists(),
  body("password").isLength({ min: 6, max: 30 }).exists()
],

 function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  userservice.authenticate({email, password})
    .then(user => user ? res.cookie('token', user.token).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));


});

router.get(
  '/auth/verify',
  verifyToken,
  function (req, res, next) {
      res.send("You are currently logged in");

  }
);




module.exports = router;
