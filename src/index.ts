import { Client, Events, GatewayIntentBits } from "discord.js";

import { handleRandomWebsim } from "./handlers/random-websim";
import { updateCommands } from "./update-commands";
import { handleCalculate } from "./handlers/calculate";

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "random_websim": {
      return handleRandomWebsim(interaction);
    }
    case "calculate": {
      return handleCalculate(interaction);
    }
  }
});

bot.once(Events.ClientReady, async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);

  if (process.env.NODE_ENV === "production") {
    await updateCommands(bot);
  }
});

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) throw new Error("DISCORD_BOT_TOKEN is missing in .env");

await bot.login(token);
