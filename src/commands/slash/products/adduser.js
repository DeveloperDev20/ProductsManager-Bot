const { SlashCommandBuilder } = require("@discordjs/builders");
const { addUserToProduct, getProductList } = require("../../../database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-user")
    .setDescription("Añade un comprador a un producto existente.")
    .addStringOption(option =>
      option.setName("producto").setDescription("Nombre del producto").setRequired(true)
    )
    .addUserOption(option =>
      option.setName("comprador").setDescription("Usuario que se añadirá como comprador").setRequired(true)
    ),
    cooldown: 5000,
    ownerOnly: true,
  run: async (client, interaction) => {


    const productName = interaction.options.getString("producto");
    const buyer = interaction.options.getUser("comprador");


    const productList = await getProductList();
    const product = productList.find(p => p.name === productName);

    if (!product) {
      await interaction.reply(`No se encontró el producto '${productName}'.`);
      return;
    }

    const success = await addUserToProduct( buyer.id, productName);

    if (success) {
      await interaction.reply(`Comprador '${buyer.tag}' añadido al producto '${productName}' con éxito.`);
    } else {
      await interaction.reply(`El comprador '${buyer.tag}' ya está registrado para el producto '${productName}'.`);
    }
  }
};
