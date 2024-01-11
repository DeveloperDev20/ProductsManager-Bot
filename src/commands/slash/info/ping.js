const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    cooldown: 5000,
    ownerOnly: false,
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };
