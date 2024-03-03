import { Client, GatewayIntentBits, Partials } from "discord.js";
//import { updateStatusInterval } from "./presence";
import path from "path";

import "dotenv/config";
import "./web";

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
  //updateStatusInterval(client);
});

client.on("interactionCreate", async (interaction): Promise<any> => {
  if (interaction.isButton()) {
    try {
    const commandFile = path.join(
      __dirname,
      "commands",
      "buttons",
      `${interaction.customId}.ts`
    );
    const { default: execute } = await import(commandFile);
    return execute(client, interaction.customId, interaction);
    } catch (e) {
      console.error(e);
      return interaction.reply({
        content: "error executing command, please try again or file an issue [here](https://github.com/WriteNaN/Tipbot/)",
        ephemeral: true
      });
    }
  } else if (interaction.isModalSubmit()) {
    try {
    const commandFile = path.join(
        __dirname,
        "commands",
        "buttons",
        `${interaction.customId}.ts`
      );
      const { default: execute } = await import(commandFile);
      return execute(client, interaction);
    } catch {
        return interaction.reply({ content: "unknown error while executing command.", ephemeral: true })
    }
  }
});

client.on("messageCreate", async (message): Promise<any> => {
  if (message.author.bot) return;
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
    } catch (e) {
      console.log(e);
      return;
    }
  } else {
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
