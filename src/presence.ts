import { Client, ActivityType } from "discord.js";

export function updateStatusInterval(client: Client): void {
  const arr = [
    "Wow Much Tips! 😃💸",
    "Have you not tried !tip yet?? 🤔",
    "Hey you! Yeah you! What's your favourite crypto? 🚀",
    "Crypto high-fives all around! 🙌💰",
    "Tip me baby one more time! 🎶💵",
    "Feeling bullish today? 🐂📈",
    "Crypto conversations > Small talk. 😏💬",
    "When in doubt, HODL it out! 💪🚀",
    "Dance like no one is watching, trade like everyone is. 💃📊",
    "More tips, less problems. 💡💸",
    "Counting sats instead of sheep. 😴💭",
    "Living the decentralized dream! 🌐💭",
    "Crypto and chill? 🍿📉",
    "Ctrl+Alt+Delete your financial worries with crypto! 🖱️📉",
    "Tip me if I'm wrong, but crypto is the future! 🚀🔮",
    "Coffee, code, crypto - my daily grind! ☕💻💰",
    "In a world full of dollars, be someone's crypto. 💚💰",
    "Roses are red, violets are blue, I love crypto, how about you? 🌹💙🚀",
  ];
  client.user.setPresence({
    activities: [
      {
        name: arr[Math.floor(Math.random() * arr.length)],
        type: ActivityType.Custom,
      },
    ],
    status: "idle",
  });
  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: arr[Math.floor(Math.random() * arr.length)],
          type: ActivityType.Custom,
        },
      ],
      status: "idle",
    });
  }, 60000);
};