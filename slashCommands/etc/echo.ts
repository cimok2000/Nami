import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

const data = new SlashCommandBuilder()
.setName('echo')
.setDescription('Echo a message')
.addStringOption(option => 
    option.setName('input')
    .setDescription('The input to echo back')
    .setRequired(true));

const execute = (interaction: Discord.CommandInteraction) => { 
    const args = interaction.options.get("input")?.value;
    if (args) interaction.reply(args?.toString());
}

export default {data, execute};