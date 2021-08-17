const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  points: { type: Number, default: 0 },
  guild: {
    type: Object,
    default: {
      inGuild: { type: Boolean, default: false },
      guildId: { type: Number, default: 0 },
    },
  },
  party: {
    type: Object,
    default: {
      inParty: { type: Boolean, default: false },
      partyId: { type: Number, default: 0 },
    },
  },
  inventory: {
    type: Object,
    default: {
      weapons: { type: Array, default: [] },
      armor: { type: Array, default: [] },
      items: { type: Array, default: [] },
      skills: { type: Array, default: [] },
    },
  },
});

module.exports = mongoose.model("User", schema);
