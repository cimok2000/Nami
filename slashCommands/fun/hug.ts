import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import Neko from 'nekos.life';
const neko = new Neko();

const data = new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Hugs a user')
    .addStringOption(option => 
        option.setName('user')
          .setDescription('The input to echo back')
          .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const args = interaction.options.get("user")?.value?.toString()
      .replace("<@!", "")
      .replace(">", "");
    const user = bot.users.cache.get(args!);
    const gif = await neko.sfw.hug();

    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.username} hugged ${user!.username}`)
      .setColor("RANDOM")
      .setAuthor(interaction.user.username, interaction.user.avatarURL()!)
      .setImage(gif.url)
      .setTimestamp();

    interaction.reply({embeds: [embed]});
}

export default {data, execute};