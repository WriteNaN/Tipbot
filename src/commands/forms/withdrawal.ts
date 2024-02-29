import { Client, type ModalSubmitInteraction } from "discord.js";

export default async function execute(client: Client, interaction: ModalSubmitInteraction) {
    return interaction.reply("WIP");
}