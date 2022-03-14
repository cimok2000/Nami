import Discord from "discord.js";
import chalk from "chalk";

class Logger {
  bot: Discord.Client;
  constructor(bot: Discord.Client) {
    this.bot = bot;
  }
  public onReady() {
    console.log(`${chalk.red('[BOT.LOAD]')} Logged in as ${this.bot.user!.tag}`);
  }
  public onMessageCreate(message: Discord.Message) {
    console.log(`${chalk.blue('[MESSAGE.CREATE]')} ${message.author.username}#${message.author.discriminator}: ${message.content}`);
  }
  public onMessageDelete(message: Discord.Message | Discord.PartialMessage) {
    if (message.author) 
      console.log(`${chalk.red('[MESSAGE.DELETE]')} ${message.author.username}#${message.author.discriminator}: ${message.content}`);
    else 
      console.log(`${chalk.red('[MESSAGE.DELETE]')} ${chalk.yellow('[!Unknown Username!]:')} ${message.content}`);
  }
  public onMessageUpdate(oldMessage: Discord.Message | Discord.PartialMessage, newMessage: Discord.Message | Discord.PartialMessage) {
    if (oldMessage.author) 
      console.log(`${chalk.yellow('[MESSAGE.UPDATE]')} ${oldMessage.author.username}#${oldMessage.author.discriminator}: [FROM] ${oldMessage.content} | [TO] ${newMessage.content}`);
    else 
      console.log(`${chalk.yellow('[MESSAGE.UPDATE]')} [Unknown User]: [FROM] ${oldMessage.content} | [TO] ${newMessage.content}`)
  }
  public onGuildMemberAdd(member: Discord.GuildMember) {
    console.log(`[GUILDMEMBER.ADD] User Joined: ${member.user.username}#${member.user.discriminator}`);
  }
  public onGuildMemberRemove(member: Discord.GuildMember | Discord.PartialGuildMember) {
    if (member.user)
      console.log(`[GUILDMEMBER.ADD] User Left: ${member.user.username}#${member.user.discriminator}`);
  }
  public onThreadCreate(thread: Discord.ThreadChannel) {
    console.log(`${chalk.green('[THREAD.CREATE]')} Name: ${thread.name}`);
  }
  public onThreadDelete(thread: Discord.ThreadChannel) {
    console.log(`${chalk.red('[THREAD.REMOVE]')} Name: ${thread.name}`);
  }
  public onLoadCommand(type: string, name: string) {
    console.log(`${chalk.green('[COMMAND.LOAD]')} Attempting to load ${chalk.red(type)} command '${chalk.blue(name)}'`);
  }
  public onLoadFolder(type: string, name: string) {
    console.log(`${chalk.green('[COMMAND.LOAD]')} Attempting to load ${chalk.red(type)} directory ${chalk.blue(name)}'`);
  }
  public onRegisterSlashCommands(guildId: string) {
    if (guildId) console.log(`${chalk.green('[COMMAND.REGISTER]')} Started refreshing application ${chalk.red('[/]')} commands for ${chalk.blue(`'${guildId}'`)}`);
    else console.log(`${chalk.green('[COMMAND.REGISTER]')} Started refreshing application ${chalk.red('[/]')} commands`);
  }
  public onSuccessfulRegisterSlashCommands() {
    console.log(`${chalk.green('[COMMAND.REGISTER]')} Successfully registered.`);
  }
  public onSuccessfulDatabaseConnection() {
    console.log(`${chalk.green('[DATABASE.CONNECTION]')} Successfully Connected ✅`);
  }
  public onUnsuccessfulDatabaseConnection() {
    console.log(`${chalk.green('[DATABASE.CONNECTION]')} Unsuccessful Connection ❌`);
  }
}

export default Logger;