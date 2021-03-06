const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route  GET api/auth
// @desc   Get user by token
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email address").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid login details" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid login details" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Return JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.send("User register route OK");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
