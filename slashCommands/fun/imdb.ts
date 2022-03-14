import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import axios, { AxiosRequestConfig } from "axios";

// https://rapidapi.com/apidojo/api/imdb8/

const data = new SlashCommandBuilder()
    .setName('imdb')
    .setDescription('IMDB Search')
    .addStringOption(option => 
        option.setName('search')
        .setDescription('search query')
        .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const search = interaction.options.get('search')?.value?.toString();
    var options: AxiosRequestConfig<any> = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/auto-complete',
      params: { q: search },
      headers: { 
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_KEY?.toString()
      }
    }

    const request = await (await axios.request(options)).data.d[0];

    const embed = new MessageEmbed()
      .setTitle(`${request.l}`)
      .setAuthor(interaction.user.username)
      .setColor("RANDOM")
      .addField("Cast", request.s)
      .setImage(request.i.imageUrl)
      .setTimestamp();

    interaction.reply({embeds: [embed]});
}

export default {data, execute};