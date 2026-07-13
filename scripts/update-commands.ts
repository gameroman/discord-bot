import { Client, Events } from "discord.js";

import { updateCommands } from "../src/update-commands";

async function main() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const devGuildId = process.env.DISCORD_DEV_GUILD_ID;

  if (!token) throw new Error("DISCORD_BOT_TOKEN is missing in .env");
  if (!devGuildId)
    throw new Error(
      "DISCORD_DEV_GUILD_ID is missing in .env for development sync",
    );

  const deployerBot = new Client({ intents: [] });

  deployerBot.once(Events.ClientReady, async (bot) => {
    try {
      await updateCommands(bot, devGuildId);
    } catch (error) {
      console.error("Failed to update commands in development:", error);
    } finally {
      await bot.destroy();
    }
  });

  await deployerBot.login(token);
}

await main();
