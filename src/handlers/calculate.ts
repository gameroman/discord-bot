import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import { calculate } from "picocalc";

function wrap(str: string) {
  return `\`${str}\`` as const;
}

/**
 * Evaluate a mathematical expression
 */
export async function handleCalculate(
  interaction: ChatInputCommandInteraction<CacheType>,
) {
  await interaction.reply("Calculating...");
  const expression = interaction.options.getString("expression", true);

  try {
    const result = calculate(expression);
    await interaction.editReply(`${wrap(expression)} = ${wrap(result)}`);
  } catch {
    await interaction.editReply("Failed to evaluate the expression.");
  }
}
