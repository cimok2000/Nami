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
        player = await user.getUserInventory(message.author.username);

        // Compact this entire thing
        let weapons = "";
        let armors = "";
        let items = "";
        let skills = "";

        for (weapon in player.inventory.weapons) {
          weapons = `${weapons}${player.inventory.weapons[weapon].name}\n`;
        }
        for (armor in player.inventory.armors) {
          armors = `${armors}${player.inventory.armors[armor].name}\n`;
        }
        for (item in player.inventory.items) {
          items = `${items}${player.inventory.items[item].name}\n`;
        }
        for (skill in player.inventory.skills) {
          skills = `${skills}${player.inventory.skills[skill].name}\n`;
        }

        try {
          let embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Inventory`)
            .addField("Weapons", weapons)
            .addField("Armors", armors)
            .addField("Items", items)
            .addField("Skills", skills);

          message.reply({ embeds: [embed] });
        } catch {
          message.reply("No Inventory Available");
        }
      } catch (err) {
        message.reply("You don't have an inventory yet. Use the setup command.");
      }
    } else {
      inventory = await user.getUserInventory(args);
      message.reply(`${inventory.username} has ${inventory.points} points.`);
    }
  },
};
