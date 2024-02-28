import { Client, type ButtonInteraction } from "discord.js";

export default async function execute(
  client: Client,
  id: string,
  interaction: ButtonInteraction
) {
  return interaction.message.delete();
}
