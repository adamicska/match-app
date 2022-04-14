const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  club: {
    type: String,
  },
  bio: {
    type: String,
  },
  follows: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  followed: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  // Add Posts
  // Add Comments
  social: {
    whatsapp: {
      type: String,
    },
    telegram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
