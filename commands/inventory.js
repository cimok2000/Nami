const User = require("../classes/user.js");
const user = new User();
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "inventory",
  description: "Show user inventory",
  usage: "inventory",
  requiresProcessing: true,
  execute: async (message, args) => {
    let inventory = {};

    if (args.length == 0) {
      try {
        inventory = await user.getUserInventory(message.author.username);
        console.log(inventory.inventory.armor);
        let embed = new MessageEmbed()
          .setTitle(`${message.author.username}'s Inventory`)
          // .setField("Armor", ...inventory.inventory.armor)
          // .setField("Weapons", ...inventory.inventory.weapons)
          // .setField("Items", ...inventory.inventory.items)
          // .setField("Skills", ...inventory.inventory.skills)
        
        message.reply({ embeds: [embed]});

      } catch {
        message.reply("You don't have an inventory yet.");
        await user.addUserToDB(message.author);
      }
    } else {
      inventory = await user.getUserInventory(args);
      message.reply(`${inventory.username} has ${inventory.points} points.`);
    }
  },
};
