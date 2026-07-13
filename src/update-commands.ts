import {
  Client,
  Routes,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

const commands = [
  new SlashCommandBuilder()
    .setName("random_websim")
    .setDescription("Find a random websim project"),
  new SlashCommandBuilder()
    .setName("calculate")
    .addStringOption(
      new SlashCommandStringOption()
        .setName("expression")
        .setRequired(true)
        .setDescription("A mathematical expression to evaluate")
        .setMaxLength(512),
    )
    .setDescription("Evaluate a mathematical expression"),
].map((command) => command.toJSON());

async function updateCommands(bot: Client<true>, guildId?: string) {
  const targetRoute = guildId
    ? Routes.applicationGuildCommands(bot.user.id, guildId)
    : Routes.applicationCommands(bot.user.id);

  console.log(
    `Refreshing application (/) commands... [Mode: ${guildId ? "Guild Dev" : "Global Prod"}]`,
  );

  await bot.rest.put(targetRoute, { body: commands });

  console.log("Successfully reloaded application (/) commands.");
}

export { updateCommands };
