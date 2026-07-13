declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DISCORD_BOT_TOKEN?: string;
      readonly DISCORD_DEV_GUILD_ID?: string;
    }
  }
}

export {};
