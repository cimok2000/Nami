import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Gets current song queue');

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    interaction.deferReply();
    const queue = music.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) return interaction.followUp({ content: "❌ | No music is being played!" });
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
        return `${i + 1}. **${m.title}** ([link](${m.url}))`;
    });

    const embed = new MessageEmbed()
        .setTitle("Server Queue")
        .setDescription(`${tracks.join("\n")}${
            queue.tracks.length > tracks.length
            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
            : ""
        }`)
        .setColor("RANDOM")
        .addField("Now Playing", `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))`);

    return interaction.followUp({ embeds: [embed] })
}

export default {data, execute};