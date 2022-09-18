const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true },
  messages: [{ type: mongoose.Types.ObjectId, required: true, ref: "Message" }],
});

userSchema.plugin(validator);

module.exports = mongoose.model("User", userSchema);
