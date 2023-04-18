const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    mobile: String,
  },
  {
    collection: "mern",
  }
);

mongoose.model("mern", userDetails);
