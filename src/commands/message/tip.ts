import type { Client, Message } from "discord.js";

export default function execute(client: Client, message: Message, args: any[]){
    return message.reply("hi!");
}