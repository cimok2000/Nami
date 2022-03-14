import Discord from 'discord.js';
import { Player } from 'discord-player';

class MusicHandler {
    bot: Discord.Client;
    public player: Player;

    constructor(bot: Discord.Client) {
        this.bot = bot;
        this.player = new Player(this.bot);
        this.player.on('trackStart', (queue: any, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));
    }
}

export default MusicHandler;