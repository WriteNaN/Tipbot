import { Client, Message, EmbedBuilder, ChannelType } from "discord.js";
import { getUser, createUser } from "../../utils/db";

import depositTips from "../../json/depositTips.json";
import logo from "../../json/logo.json";

export default async function execute(
  client: Client,
  message: Message,
  args: any[]
) {
  try {
    const id = parseInt(message.author.id);
    if (!args[1]) return message.reply("please specify a token to deposit.");
    const two = args[1].toLowerCase();
    const user = getUser(id);
    if (!user) {
      const done = await createUser(id);
      if (done) {
        const userX = getUser(id);
        try {
          const walletByNetwork = userX.wallets.find(
            (crypto) => crypto.network == two
          );
          const walletByAlias = userX.wallets.find(
            (crypto) => crypto.alias == two
          );

          const addy = walletByNetwork?.address || walletByAlias?.address;
          const network = walletByNetwork?.alias || walletByAlias?.alias;

          if (addy && network) {
            return depositEmbed(message, addy, network);
          } else {
            throw new Error(`Couldn't find deposit address for ${args[1]}.`);
          }
        } catch (e) {
          return message.reply(`An error occurred: ${e.message}`);
        }
      } else {
        return message.reply(`Error creating a new account.`);
      }
    }

    try {
      const walletByNetwork = user.wallets.find(
        (crypto) => crypto.network == two
      );
      const walletByAlias = user.wallets.find((crypto) => crypto.alias == two);

      const addy = walletByNetwork?.address || walletByAlias?.address;
      const network = walletByNetwork?.alias || walletByAlias?.alias;

      if (addy && network) {
        return depositEmbed(message, addy, network);
      } else {
        throw new Error(`Couldn't find deposit address for ${args[1]}.`);
      }
    } catch (e) {
      return message.reply(`An error occurred: ${e.message}`);
    }
  } catch (e) {
    console.error(e);
    return message.reply(`An error occurred: ${e.message}`);
  }
}

function depositEmbed(message: Message, address: string, network: string) {
  const embed = new EmbedBuilder();
  embed.setTitle(
    `⤵ Deposit ${network.charAt(0).toUpperCase() + network.slice(1)}`
  );
  embed.setDescription(depositTips[network]);
  embed.addFields([
    {
      name: "Your deposit address",
      value: `${logo[network]} \`${address}\``,
    },
  ]);
  embed.setThumbnail(`https://quickchart.io/qr?text=${address}`);
  embed.setFooter({
    iconURL: message.author.avatarURL(),
    text: `requested by ${message.author.username}`,
  });
  embed.setTimestamp();
  try {
    if (message.channel.type !== ChannelType.DM) {
      embed.setURL(message.url);
      message.author.send({ embeds: [embed] });
      return message.reply("sent deposit address in dm!");
    } else {
      return message.reply({ embeds: [embed] });
    }
  } catch {
    return message.reply(
      "error sending deposit address. do you have your dms turned on?"
    );
  }
}
