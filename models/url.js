const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: String, required: true },
  key: { type: String, required: true },
  message: { type: mongoose.Types.ObjectId, required: true, ref: "Message" },
});

urlSchema.plugin(validator);

module.exports = mongoose.model("Url", urlSchema);
