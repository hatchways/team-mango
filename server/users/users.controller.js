const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const { body, validationResult, sanitizeParam } = require("express-validator");
const verifyToken = require("../helpers/verifyToken");


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

    userService
      .create({ firstName, lastName, email, password })
      .then(() => res.status(201).redirect(307, '/signin'))
      .catch((err) => next(err));


  }
);

router.post(
  "/signin",
  [
    body("email").isEmail().normalizeEmail().exists(),
    body("password").isLength({ min: 6, max: 30 }).exists(),
  ],

  function (req, res, next) {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    userService
      .authenticate({ email, password })
      .then((user) =>
        user
          ? res.cookie("token", user.token,{
            expires: new Date(Date.now() + 10000000),
            secure: false,
            httpOnly: true,
          }
          ).json(user)
          : res
              .status(400)
              .json({ message: "Username or password is incorrect" })
      )
      .catch((err) => next(err));
  }
);

//Testing verification
router.get("/auth/verify", verifyToken, function (req, res, next) {
  res.status(200).json("You are logged in");
});

router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

module.exports = router;
