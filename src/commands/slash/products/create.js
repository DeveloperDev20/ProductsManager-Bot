const { SlashCommandBuilder } = require("@discordjs/builders");
const { createProduct } = require("../../../database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-product")
    .setDescription("Crea un nuevo producto.")
    .addStringOption(option =>
      option.setName("nombre").setDescription("Nombre del producto").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("url").setDescription("Enlace de descarga del producto").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("usuarios").setDescription("Usuarios iniciales que han comprado el producto").setRequired(false)
    ),
    cooldown: 5000,
    ownerOnly: true,
  run: async (client, interaction) => {


    const productName = interaction.options.getString("nombre");
    const productUrl = interaction.options.getString("url");
    const initialUsers = interaction.options.getUser("usuarios") || [];

    await createProduct(productName, productUrl, [initialUsers.id]);

    await interaction.reply(`Producto '${productName}' creado con éxito.`);
  }
};
