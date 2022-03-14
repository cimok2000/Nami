require("dotenv").config();

import Discord from "discord.js";
import Logger from "./logger";
import MusicHandler from './music';
import config from "../config.json";
import { ISlashCommand, ITextCommand } from "../types";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import fs from 'fs';
import mongodb from "mongoose";

class SlashCommandHandler {
  logger: Logger;
  commands: Discord.Collection<string, ISlashCommand>;
  bot: Discord.Client;
  music: MusicHandler;

  constructor(logger: Logger, bot: Discord.Client, music: MusicHandler) {
    this.logger = logger;
    this.commands = new Discord.Collection();
    this.bot = bot;
    this.music = music;
    this.loadSlashCommands("./slashCommands");
  }

  async loadSlashCommands(directory: string) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const path = `${directory}/${file}`;
      if (file.endsWith(".ts")) {
        this.logger.onLoadCommand("SLASH", file);
        const command = await import(`.${path}`);
        this.commands.set(command.default.data.name, command.default);
      } else if (fs.statSync(path).isDirectory()) {
        this.logger.onLoadFolder("SLASH", path);
        this.loadSlashCommands(path);
      }
    }
  }

  async registerGuildSlashCommand(guildId: string) {
    const rest = new REST({ version: "9" })
      .setToken(process.env.DISCORD_TOKEN!);
    const slashCommands = this.commands.map(command => command.data);
    try {
      this.logger.onRegisterSlashCommands(guildId);
      await rest.put(Routes.applicationGuildCommands("912283963362508850", guildId),{ body: slashCommands });
      this.logger.onSuccessfulRegisterSlashCommands();
    } catch (error) {
      console.error(error);
    }
  }

  public async registerGlobalSlashCommand() {
    const rest = new REST({ version: "9" })
      .setToken(process.env.DISCORD_TOKEN!);
    const slashCommands = this.commands.map(command => command.data);
    try {
      this.logger.onRegisterSlashCommands("GLOBAL");
      await rest.put(Routes.applicationCommands("912283963362508850"), { body: slashCommands });
      this.logger.onSuccessfulRegisterSlashCommands();
    } catch (error) {
      console.error(error);
    }
  }

  public async registerGuildsSlashCommand(guildIds: Array<string>) {
    for(const guildId in guildIds) {
      this.registerGuildSlashCommand(guildIds[guildId]);
    }
  }

  async parseCommand(interaction: Discord.CommandInteraction) {
    if (interaction.user.bot) return;
    const command = interaction.commandName;
    const cmd = this.commands.get(command);
    if (!cmd) return;
    cmd.execute(interaction, this.bot, this.music);
  }
}

class CommandHandler {
  logger: Logger;
  prefix: string;
  music: MusicHandler;
  commands: Discord.Collection<string, ITextCommand>;

  constructor(logger: Logger, prefix: string, music: MusicHandler) {
    this.logger = logger;
    this.prefix = prefix;
    this.music = music;
    this.commands = new Discord.Collection();
    this.loadCommands(this.commands, "./commands");
  }

  async loadCommands(collection: Record<string, any>, directory: string) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const path = `.${directory}/${file}`;
      if (file.endsWith(".ts")) {
        this.logger.onLoadCommand("TEXT", file);
        const command = await import(path);
        collection.set(command.default.name, command.default);
      } else if (fs.statSync(path).isDirectory()) {
        this.logger.onLoadFolder("TEXT", path);
        this.loadCommands(collection, path);
      }
    }
  }

  public parseCommand(message: Discord.Message) {
    if (message.content.lastIndexOf(this.prefix) !== 0) return;
    if (message.author.bot) return;
    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase();
    const cmd = this.commands.get(command);
    if(!cmd) return;
    cmd.execute(message, {command, args}, this.music);
  }
}

class API {
  bot: Discord.Client;
  prefix: string;
  logger: Logger;
  music: MusicHandler;
  commandHandler: CommandHandler;
  slashCommandHandler: SlashCommandHandler;

  constructor(bot: Discord.Client, prefix: string) {
    this.bot = bot;
    this.prefix = prefix;
    this.logger = new Logger(this.bot);
    mongodb.connect(process.env.MONGODB_KEY!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      this.logger.onSuccessfulDatabaseConnection();
    }).catch((err) => {
      this.logger.onUnsuccessfulDatabaseConnection();
    });
    this.music = new MusicHandler(this.bot);
    this.commandHandler = new CommandHandler(this.logger, config.prefix, this.music);
    this.slashCommandHandler = new SlashCommandHandler(this.logger, this.bot, this.music);
  }

  public onReady() {
    this.logger.onReady();
    this.setUserActivity();
    this.slashCommandHandler.registerGuildsSlashCommand([
      "733320427648319619",
      "764721812730806322"
    ]);
  }
  public setUserActivity() {
    this.bot.user?.setActivity(`${this.prefix}help`, { type: "WATCHING" });
  }
  public async onMessageCreate(message: Discord.Message) {
    this.logger.onMessageCreate(message);
    if (!message.content.startsWith(this.prefix)) return;
    this.commandHandler.parseCommand(message);
  }
  public onMessageDelete(message: Discord.Message | Discord.PartialMessage) {
    this.logger.onMessageDelete(message);
  }
  public onMessageUpdate(oldMessage: Discord.Message | Discord.PartialMessage, newMessage: Discord.Message | Discord.PartialMessage) {
    this.logger.onMessageUpdate(oldMessage, newMessage);
  }
  public onInteractionCreate(interaction: Discord.Interaction) {
    if (!interaction.isCommand()) return;
    this.slashCommandHandler.parseCommand(interaction);
  }
  public onGuildMemberAdd(member: Discord.GuildMember) {
    this.logger.onGuildMemberAdd(member);
  }
  public onGuildMemberRemove(member: Discord.GuildMember | Discord.PartialGuildMember) {
    this.logger.onGuildMemberRemove(member);
  }
  public onThreadCreate(thread: Discord.ThreadChannel) {
    this.logger.onThreadCreate(thread);
  }
  public onThreadDelete(thread: Discord.ThreadChannel) {
    this.logger.onThreadDelete(thread);
  }
}

export default API;