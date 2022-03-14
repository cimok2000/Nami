import { SlashCommandBuilder } from '@discordjs/builders';
import Discord, { MessageEmbed } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears a channel')
    .addNumberOption(option => 
        option.setName('amount')
            .setDescription('Amount to Clear')
            .setRequired(true))
    .addUserOption(option => 
        option.setName('target')
            .setDescription('The user to target')
            .setRequired(false));

const execute = async (interaction: Discord.CommandInteraction, bot: Discord.Client) => {
    if (!interaction.member?.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "You do not have the correct permissions!" });

    const { channel, options } = interaction;
    const amount = options.getNumber("amount");
    const target = options.getMember("target");
    const messages = await channel?.messages.fetch();
    const embed = new MessageEmbed()
        .setColor("RANDOM");

    if(target) {
        let i = 0;
        let filtered = 0;
        (await messages)?.filter((message) => {
            if(message.author.id === target.id && amount! > i) {
                message.delete();
                filtered++;
                i++;
            }
        });
        embed.setDescription(`:broom: Cleared ${filtered.toString()} from ${target}.`);
        interaction.reply({embeds: [ embed ]});
    } else {
        messages?.forEach(message => message.delete());
        embed.setDescription(`:broom: Cleared ${messages?.size.toString()} from ${target}.`);
        interaction.reply({embeds: [ embed ]});
    }
}

export default {data, execute};