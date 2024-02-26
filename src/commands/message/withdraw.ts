import {
  Client,
  Message,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";

import logo from "../../json/logo.json";
import depositTips from "../../json/depositTips.json";

import { getUser } from "../../utils/db";

export default async function execute(
  client: Client,
  message: Message,
  args: any[]
) {
  if (message.channel.type !== ChannelType.DM)
    return message.reply("use this command in dm to withdraw.");

  if (!args[1])
    return message.reply(
      "please specify the token to withdraw. eg: !withdraw xno"
    );

  const user = getUser(parseInt(message.author.id));

  if (!user)
    return message.reply(
      "no user found with your id, please initialize your account by using !deposit command."
    );

  try {
    const walletByNetwork = user.wallets.find(
      (crypto) => crypto.network == args[1].toLowerCase()
    );
    const walletByAlias = user.wallets.find(
      (crypto) => crypto.alias == args[1].toLowerCase()
    );
    const network = walletByNetwork?.alias || walletByAlias?.alias;
    const btn = new ButtonBuilder()
      .setCustomId("withdrawal")
      .setLabel(`Withdraw`)
      .setStyle(ButtonStyle.Primary)
      .setEmoji(logo[network]);

    const embed = new EmbedBuilder();
    embed.setTitle(`Withdraw ${network.charAt(0).toUpperCase()+network.slice(1)}`);
    embed.setDescription(depositTips.instructions.withdraw);
    embed.setTimestamp();

    const row = new ActionRowBuilder().addComponents(btn);

    return message.reply({
      embeds: [embed],
      // @ts-expect-error .
      components: [row],
    });
  } catch (e) {
    console.error(e);
    //return message.reply("an error occured while executing the withdrawal request. please make an issue [here](https://github.com/WriteNaN/Tipbot/issues) if error persists.");
    return message.reply(
      "an error occured while trying to send the withdrawal form"
    );
  }
}
