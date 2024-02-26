import { Client, GatewayIntentBits, Partials } from "discord.js";
import { updateStatusInterval } from "./presence";
import path from "path";

import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: [Partials.Channel, Partials.Message],
});

const prefix = process.env.PREFIX;

client.once("ready", () => {
  console.log(`logged in as ${client.user?.username}!`);
  updateStatusInterval(client);
});

client.on("messageCreate", async (message): Promise<any> => {
  if (
    message.content.startsWith(prefix) ||
    message.content.split(" ")[0] == `<@${client.user?.id}>`
  ) {
    const parsedCMD = message.content.startsWith(prefix)
      ? message.content.slice(1).split(" ")
      : message.content.split(" ").splice(1);
    try {
      const commandFile = path.join(
        __dirname,
        "commands",
        "message",
        `${parsedCMD[0].toLowerCase()}.ts`
      );
      const { default: execute } = await import(commandFile);
      return execute(client, message, parsedCMD);
    } catch {
      return;
    }
  } else {
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);