import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips current song');

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    interaction.deferReply();
    const queue = music.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played!" });
    const currentTrack = queue.current;
    const success = queue.skip();
    return interaction.followUp({ content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!" });
}

export default {data, execute};