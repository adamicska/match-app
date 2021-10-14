const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const db = require("./config/db");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const render = res.render;
  const send = res.send;
  res.render = function renderWrapper(...args) {
    Error.captureStackTrace(this);
    return render.apply(this, args);
  };
  res.send = function sendWrapper(...args) {
    try {
      send.apply(this, args);
    } catch (err) {
      console.error(
        `Error in res.send | ${err.code} | ${err.message} | ${res.stack}`
      );
    }
  };
  next();
});

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
