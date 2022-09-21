const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true },
  message: {
    type: String,
    required: true,
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  url: [{ type: mongoose.Types.ObjectId, required: true, ref: "Url" }],
});

messageSchema.plugin(validator);

module.exports = mongoose.model("Message", messageSchema);
