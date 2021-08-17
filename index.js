require("dotenv").config();

console.clear();

const chalk = require("chalk");
const { version } = require("./package.json");

console.log(
  chalk.hex("#FF33A7")(`
    __    _  _______  __   __  ___  
    |  |  | ||   _   ||  |_|  ||   | 
    |   |_| ||  |_|  ||       ||   | 
    |       ||       ||       ||   | 
    |  _    ||       ||       ||   | 
    | | |   ||   _   || ||_|| ||   | by cimok
    |_|  |__||__| |__||_|   |_||___| v${version}
    \n`)
);

const Discord = require("discord.js");
const fs = require("fs");

class Nami {
  constructor() {
    this.commands = new Discord.Collection();
    this.loadCommands();
    this.bot = new Discord.Client({
      intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });

    this.bot.on("ready", () => {
      console.log(chalk.hex("#FF33A7")(`${this.bot.user.username} is now online!\n`));
    });
    this.bot.on("messageCreate", (message) => this.onMessageCreate(message));
    this.bot.login(process.env.DISCORD_TOKEN);
  }

  loadCommands() {
    const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    for (const file of commands) {
      const command = require(`./commands/${file}`);
      this.commands.set(command.name, command);
      // Place in the logger class
      console.log(`Imported command - ${chalk.cyan(command.name)}`);
    }
  }

  onMessageCreate(message) {
    if (message.author.bot) return;
    console.log(`${message.author.username}: ${message.content}`)
    const command = this.commands.get(message.content.split(" ")[0].slice(1));
    if (command) {
      const args = message.content.split(" ").slice(1);
      command.execute(message, args);
      // Place in the logger class
      console.log(`Executed command - ${chalk.red(command.name)}`);
    }
  }
}

new Nami();