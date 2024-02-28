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
import { objects } from "../../emoji";

import { getUser } from "../../utils/db";

export default async function execute(
  client: Client,
  message: Message,
  args: any[]
) {
  if (message.channel.type !== ChannelType.DM)
    return message.reply("use this command in dm to withdraw.");

  if (args[1])
    return message.reply(
      "withdrawal of all supported currencies is unified, please proceed with no arguments."
    );

  const user = getUser(parseInt(message.author.id));

  if (!user)
    return message.reply(
      "no user found with your id, please initialize your account by using !deposit command."
    );

  try {
    const btn = new ButtonBuilder()
      .setCustomId("withdrawal")
      .setLabel(`Withdraw`)
      .setStyle(ButtonStyle.Success)
      .setEmoji(objects.money_with_wings);

    const embed = new EmbedBuilder();
    embed.setTitle(
      `Withdraw Tokens`
    );
    embed.setDescription(depositTips.instructions.withdraw);
    embed.setTimestamp();
    embed.setThumbnail("https://33.media.tumblr.com/e04f8aa335be5eeab0a0dfd317f04f7c/tumblr_nig1owKqZA1sjegsuo1_500.gif");
    embed.setColor('Green');

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
