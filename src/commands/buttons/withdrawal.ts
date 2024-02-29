import {
  Client,
  type ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

export default async function withdrawal(
  client: Client,
  id: string,
  interaction: ButtonInteraction
): Promise<any> {
  const modal = new ModalBuilder()
    .setCustomId("withdrawal")
    .setTitle("Withdrawal Form");
  const network = new TextInputBuilder()
    .setCustomId("network")
    .setLabel("Network")
    .setPlaceholder("eg: XNO/NANO")
    .setRequired()
    .setStyle(TextInputStyle.Short);
  const amount = new TextInputBuilder()
    .setCustomId("amount")
    .setLabel("Withdrawal Amount")
    .setRequired()
    .setPlaceholder("0.001")
    .setStyle(TextInputStyle.Short);
    const address = new TextInputBuilder()
    .setCustomId("address")
    .setLabel("address")
    .setLabel("Recipient Address")
    .setPlaceholder("...Your Withdrawal Address")
    .setStyle(TextInputStyle.Short);
  const networkX = new ActionRowBuilder().addComponents(network);
  const amountX = new ActionRowBuilder().addComponents(amount);
  const addressX = new ActionRowBuilder().addComponents(address);
  try {
  // @ts-expect-error type
  modal.addComponents(networkX, addressX, amountX);
  return await interaction.showModal(modal);
  } catch (e) {
    console.error(e); // debug
  }
}
