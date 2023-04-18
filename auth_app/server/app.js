const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);

const URL = process.env.MONGO_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.send("Hello, ML!");
});

require("./UserSchema");
const User = mongoose.model("mern");

app.get("/users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/register", async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .send({ status: "Error", message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    res.send({ status: "User Registered Successfully!" });
  } catch (error) {
    res.status(500).send({ status: "Error", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send({ status: "Error", message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ status: "Error", message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, "this_is_a_secret_token");
    res.send({ status: "Login successful", token, user });
  } catch (error) {
    res.status(500).send({ status: "Error", error });
  }
});

app.delete("/users/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
