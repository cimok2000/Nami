import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import { connection } from "mongoose";

const data = new SlashCommandBuilder()
    .setName('status')
    .setDescription('Displays bot status');

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => {
    const embed = new MessageEmbed()
      .setTitle(`${bot.user!.username}'s Status'`)
      .setColor("RANDOM")
      .addField("Bot", `\`🟢 ONLINE\` - \`${bot.ws.ping}ms\``)
      .addField("Uptime", `<t:${parseInt(bot.readyTimestamp! / 1000)}:R>`)
      .addField("Database", `\`${switchTo(connection.readyState)}\``);

      interaction.reply({ embeds: [embed] });
}

function switchTo(val: number) {
  var status = " ";
  switch(val) {
    case 0 : status = `🔴 DISCONNECTED`; break;
    case 1 : status = `🟢 CONNECTED`; break;
    case 2 : status = `🟠 CONNECTING`; break;
    case 3 : status = `🟣 DISCONNECTING`; break;
  }
  return status;
}

export default {data, execute};