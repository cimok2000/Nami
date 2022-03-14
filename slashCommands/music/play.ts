import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song')
    .addStringOption(option => 
        option.setName('query')
            .setDescription('Song to play')
            .setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => { 
    if (!interaction.member?.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (interaction.guild?.me?.voice.channelId && interaction.member?.voice.channelId !== interaction.guild.me.voice.channelId) return interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    const query = interaction.options.get("query")?.value;
    const queue = music.player.createQueue(interaction.guild!, {
        metadata: {
            channel: interaction.channel
        }
    });

    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        queue.destroy();
        return interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }

    interaction.deferReply();
    const track = await music.player.search(query, {
        requestedBy: interaction.user
    }).then(x => x.tracks[0]);
    if (!track) return interaction.followUp({ content: `❌ | Track **${query}** not found!` });

    queue.play(track);
    return interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` })
}

export default {data, execute};