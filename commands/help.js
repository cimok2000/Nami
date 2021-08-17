const fs = require("fs");
const {
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
  MessageEmbed,
} = require("discord.js");
const { pagination } = require("reconlx");

module.exports = {
  name: "help",
  description: "The help command",
  usage: "help",
  requiresProcessing: false,
  execute: async (message, args) => {
    let commands = [];
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      commands.push(command);
    }

    // This is a bit of a hack way, replace with a better way
    // let toPrint = "";
    // for (const command of commands) {
    //   toPrint = toPrint + `${command.name} - ${command.description} (${command.usage})\n}`;
    // }

    const page1 = "help - The help command\n"
    // const page2 = "help - The help command\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh"
    // const page3 = "help - The help command\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh"
    // const page4 = "help - The help command\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh\nbruh - bruh"

    // Replace this with my own system instead of using a premade package
    const page1Embed = new MessageEmbed()
      .setTitle("Help - Page 1")
      .setDescription(page1);
    // const page2Embed = new MessageEmbed()
    //   .setTitle("Help - Page 2")
    //   .setDescription(page2);
    // const page3Embed = new MessageEmbed()
    //   .setTitle("Help - Page 3")
    //   .setDescription(page3);
    // const page4Embed = new MessageEmbed()
    //   .setTitle("Help - Page 4")
    //   .setDescription(page4);

    const embeds = [
      page1Embed,
      // page2Embed,
      // page3Embed,
      // page4Embed
    ];

    pagination({
      embeds: embeds,
      message,
      message,
      time: 10000,
      fastSkip: true,
      pageTravel: true,
    });

    // const row = new MessageActionRow().addComponents(
    //   new MessageButton()
    //     .setCustomId("helpBack")
    //     .setLabel("Back")
    //     .setStyle("PRIMARY"),
    //   new MessageButton()
    //     .setCustomId("helpNext")
    //     .setLabel("Next")
    //     .setStyle("PRIMARY"),
    // )

    // message.channel.send({content: "Yes", components: [row] })

    // const filter = (interaction) => {
    //   // if(message.author.bot === true) return;
    //   if(interaction.user.id === message.author.id) return true;
    //   return interaction.reply({ content: "You can't use this button"});
    // }

    // const collector = message.channel.createMessageComponentCollector({
    //   filter,
    //   max: 1,
    // });

    // collector.on("end", (ButtonInteraction) => {
    //   const id = ButtonInteraction.first().customId;
    // })

  },
};
