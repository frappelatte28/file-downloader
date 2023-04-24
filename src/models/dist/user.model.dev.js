"use strict";

var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model("user", UserSchema);