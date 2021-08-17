const World = require("../classes/world.js");
const world = new World();
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "worlds",
  description: "Show worlds",
  usage: "worlds",
  requiresProcessing: true,
  execute: async (message, args) => {
    const worlds = await world.getStatus();
    for (const world in worlds) {
      const embed = new MessageEmbed()
        .setTitle(`${worlds[world].name}`)
        .setThumbnail("https://i.redd.it/lfcn4bi2xan21.png")
        .addField("World", worlds[world].name, true)
        .addField("Status", String(worlds[world].status), true)
        .addField("Floors Completed", String(worlds[world].floorsCompleted), false)
      message.reply({ embeds: [embed] });
    }
  },
};
