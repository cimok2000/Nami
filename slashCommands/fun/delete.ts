import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import axios from "axios";

const data = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deleted')
    .addStringOption(option => 
        option.setName('image')
        .setDescription('an image')
        .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const image = interaction.options.get("image")?.value?.toString()
    const imageUrl = `https://api.no-api-key.com/api/v2/delete?image=${image}`;

    // const embed = new MessageEmbed()
    //   .setTitle(`${user!.username} got kicked`)
    //   .setColor("RANDOM")
    //   .setAuthor(interaction.user.username, interaction.user.avatarURL()!)
    //   .setImage(imageUrl)
    //   .setTimestamp();

    interaction.reply({content: imageUrl});
}

export default {data, execute};