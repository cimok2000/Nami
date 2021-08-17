const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  floorsCompleted: { type: Number, required: true },
  topFloor: { type: Number, required: true },
});

module.exports = mongoose.model("World", schema);
