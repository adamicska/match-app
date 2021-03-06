const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.messe);
    res.status(500).send("Server error");
  }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post(
  "/",
  [
    auth,
    check("level", "Level is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { country, location, level, status, club, ...rest } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      country: country,
      location: location,
      level: level,
      status: status,
      club: club,
      ...rest,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Upsert option creates new doc if no match is found
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    console.log(profileFields.clubs);

    res.send("profile data");
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    console.log(user_id);

    // Fix profile find. user_id is sent properly from the front-end
    try {
      const profile = await Profile.findOne({
        _id: user_id,
      }).populate("user", ["name", "avatar"]);

      console.log(profile);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/follow/:id
// @desc     Follow a profile
// @access   Private
router.put("/follow/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });
    const user = await Profile.findOne({ user: req.user.id });

    // Check if the profile has already been followed
    if (
      user.follows.some((follow) => follow.user.toString() === req.params.id)
    ) {
      return res.status(400).json({ msg: "User already followed" });
    }

    user.follows.unshift({ user: req.params.id });

    await user.save();

    return res.json(user.follows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
