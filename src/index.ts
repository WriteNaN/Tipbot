import { Client, GatewayIntentBits, Partials } from "discord.js";
import { people } from "./emoji";

import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageTyping
  ],
  partials: [Partials.Channel, Partials.Message]
});

const prefix = process.env.PREFIX;

client.once("ready", () => {
  console.log(`logged in as ${client.user?.username}!`);
});

client.on("messageCreate", async (message): Promise<any> => {
  if (message.content.startsWith(prefix) || message.content.split(" ")[0] == `<@${client.user?.id}>`) {
    message.react(people.slight_smile);
    return message.reply("hi!");
  } else {
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);