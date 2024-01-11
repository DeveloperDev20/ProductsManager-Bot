const { SlashCommandBuilder } = require("@discordjs/builders");
const { removeUserFromProduct, getProductList } = require("../../../database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-user")
    .setDescription("Remueve un comprador de un producto existente.")
    .addStringOption(option =>
      option.setName("producto").setDescription("Nombre del producto").setRequired(true)
    )
    .addUserOption(option =>
      option.setName("comprador").setDescription("Usuario que se removerá como comprador").setRequired(true)
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

    const success = await removeUserFromProduct(buyer.id, productName);

    if (success) {
      await interaction.reply(`Comprador '${buyer.tag}' removido del producto '${productName}' con éxito.`);
    } else {
      await interaction.reply(`El comprador '${buyer.tag}' no está registrado para el producto '${productName}'.`);
    }
  }
};
