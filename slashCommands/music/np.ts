import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('np')
    .setDescription('Gets currently playing');

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    interaction.deferReply();
    const queue = music.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played!" });

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    const embed = new MessageEmbed()
        .setTitle("Server Queue")
        .setDescription(`🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`)
        .setColor("RANDOM")
        .setImage('https://cdn.discordapp.com/attachments/764723767813341194/916876177946325022/Nami_msuic_v_2.gif')
        .addField("\u200b", progress);

    return interaction.followUp({ embeds: [embed] })
}

export default {data, execute};