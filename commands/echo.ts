import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import { defineCommand, ICommand } from '../types';

export default defineCommand({
    name: "echo",
    description: "Echo a message",
    options: [
        {
            name: "sentence",
            type: "STRING",
            description: "The sentence to echo",
            required: true
        }
    ],
    execute: async(message: Discord.Message, command: ICommand) => {
        message.reply(command.args.join(" "));
    }
});