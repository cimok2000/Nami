import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import axios from "axios";

const data = new SlashCommandBuilder()
    .setName('step')
    .setDescription('Get stepped on')
    .addStringOption(option => 
        option.setName('user')
        .setDescription('The user')
        .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const args = interaction.options.get("user")?.value?.toString()
        .replace("<@!", "")
        .replace(">", "");
    const user = bot.users.cache.get(args!);
    const imageUrl = `https://api.no-api-key.com/api/v2/crap?stepped=${await user?.avatarURL()?.replace(".webp", ".png")}&stepper=${await interaction.user.avatarURL()?.replace(".webp", ".png")}`;
    console.log(imageUrl);

    const embed = new MessageEmbed()
      .setTitle(`${user!.username} was stepped on`)
      .setColor("RANDOM")
      .setAuthor(interaction.user.username, interaction.user.avatarURL()!)
      .setImage(imageUrl)
      .setTimestamp();

    interaction.reply({embeds: [embed]});
}

export default {data, execute};