import Discord, { Intents } from "discord.js";
import Logger from "./logger";
import API from "./api";
import Config from "../config.json";

class Nami {
  private token: string;
  public bot: Discord.Client;
  public logger: Logger;
  public api: API;
  public config: typeof Config;

  constructor(token: string | undefined) {
    if(token) this.token = token;
    else { console.log("No Token Provided..."); process.exit(1); }
    this.config = Config;
    this.bot = new Discord.Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
      ]
    });
    this.api = new API(this.bot, this.config.prefix);
    this.logger = new Logger(this.bot);
    this.bot.on("ready", () => this.api.onReady());
    this.bot.on("messageCreate", (message) => this.api.onMessageCreate(message));
    this.bot.on("messageDelete", (message) => this.api.onMessageDelete(message));
    this.bot.on("messageUpdate", (oldMessage, newMessage) => this.api.onMessageUpdate(oldMessage, newMessage));
    this.bot.on("interactionCreate", (interaction) => this.api.onInteractionCreate(interaction));
    this.bot.on("guildMemberAdd", (member) => this.api.onGuildMemberAdd(member));
    this.bot.on("guildMemberRemove", (member) => this.api.onGuildMemberRemove(member));
    this.bot.on("threadCreate", (thread) => { thread.join(); this.api.onThreadCreate(thread) });
    this.bot.on("threadDelete", (thread) => this.api.onThreadDelete(thread));
    this.bot.login(this.token);
  }
}

export default Nami;