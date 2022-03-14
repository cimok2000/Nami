import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop queue');

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    interaction.deferReply();
    const queue = music.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played!" });
    queue.destroy();
    return interaction.followUp({ content: "🛑 | Stopped the player!" });
}

export default {data, execute};