import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set volume')
    .addNumberOption(option => 
        option.setName('amount')
            .setDescription('Volume amount')
            .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    interaction.deferReply();
    const queue = music.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played!" });
    const volume = interaction.options.getNumber("amount");
    if (!volume) return interaction.followUp({ content: `🎧 | Current volume is **${queue.volume}**%!` });
    if ((volume) < 0 || (volume) > 100) return void interaction.followUp({ content: "❌ | Volume range must be 0-100" });
    const success = queue.setVolume(volume);
    return interaction.followUp({ content: success ? `✅ | Volume set to **${volume}%**!` : "❌ | Something went wrong!" });
}

export default {data, execute};