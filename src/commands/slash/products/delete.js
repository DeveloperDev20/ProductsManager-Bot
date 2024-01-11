const { SlashCommandBuilder } = require("@discordjs/builders");
const { deleteProduct } = require("../../../database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete-product")
    .setDescription("Elimina un producto existente.")
    .addStringOption(option =>
      option.setName("producto").setDescription("Nombre del producto").setRequired(true)
    ),
    cooldown: 5000,
    ownerOnly: true,
  run: async (client, interaction) => {


    const productName = interaction.options.getString("producto");




    if (productName) {


    const success = await deleteProduct(productName);

      await interaction.reply(`Producto ${productName} Eliminado`);
    }
     else {
      await interaction.reply(`No existe`);
    }
  }
};
