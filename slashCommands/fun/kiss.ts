import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import Neko from 'nekos.life';
const neko = new Neko();

const data = new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kiss a user')
    .addStringOption(option => 
        option.setName('user')
        .setDescription('The user')
        .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const args = interaction.options.get("user")?.value?.toString()
        .replace("<@!", "")
        .replace(">", "");
    const user = bot.users.cache.get(args!);
    const gif = await neko.sfw.kiss();

    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.username} kiss ${user!.username}`)
      .setColor("RANDOM")
      .setAuthor(interaction.user.username, interaction.user.avatarURL()!)
      .setImage(gif.url)
      .setTimestamp();

    interaction.reply({embeds: [embed]});
}

export default {data, execute};