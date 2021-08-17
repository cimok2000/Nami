const User = require("../classes/user.js");
const user = new User();
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "profile",
  description: "Show user profile",
  usage: "profile",
  requiresProcessing: true,
  execute: async (message, args) => {
    let profile = {};
    if (args.length == 0) {
      profile = await user.getUserProfile(message.author.username);
    } else {
      profile = await user.getUserProfile(args);
    }

    const embed = new MessageEmbed()
      .setTitle(`${profile.username}'s Profile`)
      .setThumbnail(message.author.avatarURL())
      .addField("Username", profile.username, true)
      .addField("Points", String(profile.points), true)
      .addField("In Party", String(profile.party.inParty), false)
      .addField("In Guild", String(profile.guild.inGuild), true);
    message.reply({ embeds: [embed] });
  },
};
