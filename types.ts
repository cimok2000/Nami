import Discord from 'discord.js';
import MusicHandler from './classes/music';

export interface IUser {
  id: string,
  bot: boolean,
  system: boolean,
  flags: {
    bitfield: number
  },
  username: string,
  discriminator: string,
  avatar: string,
  banner: any,
  accentColor: any
}

export interface IMentions {
  everyone: boolean,
  users: Object,
  roles: Object,
  _members: any,
  _channels: any,
  crosspostedChannels: Object,
  repliedUser: any
}

export interface IMessage {
  channelId: string,
  guildId: string,  
  deleted: false,
  id: string,       
  createdTimestamp: 1634569538980,
  type: string,
  system: false,
  content: string,
  author: IUser,
  pinned: false,
  tts: false,
  nonce: string,
  embeds: [],
  components: [],
  attachments: any,
  stickers: any,
  editedTimestamp: any,
  reactions: any,
  mentions: IMentions,
  webhookId: string,
  groupActivityApplication: any,
  applicationId: string,
  activity: any,
  flags: {
    bitfield: number
  },
  reference: any,
  interaction: any 
}

export interface ICommand {
  command: string;
  args: string[];
}

export type CommandReturnType = string | void;
export type SlashCommandExecuteFunction = (interaction: Discord.CommandInteraction, bot: Discord.Client, music: MusicHandler) => CommandReturnType | Promise<CommandReturnType>;
export type CommandExecuteFunction = (message: Discord.Message, command: ICommand, music: MusicHandler) => CommandReturnType | Promise<CommandReturnType>;

export interface ISlashCommand {
  name: string;
  description: string;
  options: [{}];
  execute: SlashCommandExecuteFunction;
}

export interface ITextCommand {
  name: string;
  description: string;
  options: [{}];
  execute: CommandExecuteFunction;
}

export function defineCommand(data: ITextCommand): ITextCommand {
  return data as ITextCommand;
};