import type { Client, Message } from "discord.js";

import { getUser, createUser } from "../../utils/db";

export default async function execute(client: Client, message: Message, args: any[]){
    const id = parseInt(message.author.id);
    const user = getUser(id);
    console.log(user);
    if (!user) {
        const done = await createUser(id);
        if (done) {
            const userX = getUser(id); 
            return message.reply(userX.toString());
        } else {
            message.reply("n");
        }
        return message.reply(user.toString());
    }
    return message.reply(user.toString());
}