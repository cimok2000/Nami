const User = require("../classes/user.js");
const user = new User();

module.exports = {
  name: "profile",
  description: "Show user profile",
  usage: "profile",
  requiresProcessing: true,
  execute: async (message, args) => {
    console.log(args.length);
    let profile = {};
    if (args.length == 0) {
      console.log(message.author.username);
      profile = await user.getUserProfile(message.author.username);
    } else {
      profile = await user.getUserProfile(args);
    }
    message.reply(`${profile.username} has ${profile.points} points.`);
  },
};
