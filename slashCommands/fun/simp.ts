import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import axios from "axios";

const data = new SlashCommandBuilder()
    .setName('simp')
    .setDescription('You\'re a simp')
    .addStringOption(option => 
        option.setName('user')
        .setDescription('The user')
        .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const args = interaction.options.get("user")?.value?.toString()
        .replace("<@!", "")
        .replace(">", "");
    const user = bot.users.cache.get(args!);
    const imageUrl = `https://api.no-api-key.com/api/v2/simpcard?image=${await user?.avatarURL()?.replace(".webp", "")}`;

    const embed = new MessageEmbed()
      .setTitle(`${user!.username} is a SIMP`)
      .setColor("RANDOM")
      .setAuthor(interaction.user.username, interaction.user.avatarURL()!)
      .setImage(imageUrl)
      .setTimestamp();

    interaction.reply({embeds: [embed]});
}

export default {data, execute};