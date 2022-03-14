import { SlashCommandBuilder } from "@discordjs/builders";
import Discord from "discord.js";

const data = new SlashCommandBuilder()
  .setName("quote")
  .setDescription("Random quote")
  .addStringOption((option) => option.setName("channel").setDescription("Channel ID").setRequired(true));

const execute = async (interaction: Discord.CommandInteraction, client: Discord.Client) => {
  const args = interaction.options.get("channel")?.value;
  const quoteChannel = args?.toString().replace("<#", "").replace(">", "");
  if (!quoteChannel) return;
  const channel = client.channels.cache.get(quoteChannel);
};

export default { data, execute };
