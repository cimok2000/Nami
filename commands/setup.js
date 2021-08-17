const User = require("../classes/user.js");
const user = new User();

module.exports = {
  name: "setup",
  description: "Show setup",
  usage: "setup",
  requiresProcessing: true,
  execute: async (message, args) => {
      try {
        await user.addUserToDB(message.author);
        message.reply("Account added!");
      } catch {
        message.reply("Error occured setting up account.");
      }
  },
};
