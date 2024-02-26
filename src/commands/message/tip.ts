import type { Client, Message } from "discord.js";

import { getUser, createUser } from "../../utils/db";

export default function execute(client: Client, message: Message, args: any[]){
    const id = parseInt(message.author.id);
    const user = getUser(id);
    if (!user) {
        const done = createUser(id);
        if (done) {
            message.reply("y");
        } else {
            message.reply("n");
        }
        const userX = getUser(id); 
        return message.reply(user.toString());
    }
    return message.reply(user.toString());
}