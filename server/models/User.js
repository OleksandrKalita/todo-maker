const { Schema, model } = require("mongoose");

const User = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = model("User", User);