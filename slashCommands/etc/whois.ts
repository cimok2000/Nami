import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';
import MusicHandler from '../../classes/music';

const data = new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Gets information on user')
    .addUserOption(option => 
        option.setName('user')
            .setDescription('The User')
            .setRequired(false));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => { 
    const user = interaction.options.getUser("user");
    let target;
    if(user) target = await interaction.guild?.members.fetch(user.id);
    else target = await interaction.guild?.members.fetch(interaction.member?.user.id);
    
    const embed = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(target?.user.tag, target?.user.avatarURL({ dynamic: true, size: 512 }))
        .setThumbnail(target?.user.avatarURL({ dynamic: true, size: 512 }))
        .addField("ID", `${target?.user.id}`)
        .addField("Roles", `${target?.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
        .addField("Member Since", `<t:${parseInt(target?.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User Since", `<t:${parseInt(target?.user.createdTimestamp / 1000)}:R>`, true);
    
    interaction.reply({ embeds: [embed] });
}

export default {data, execute};