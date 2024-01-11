const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { getProductList, getUserProducts } = require("../../../database");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("productos")
    .setDescription("Muestra los productos que has comprado."),
    cooldown: 5000,
    ownerOnly: false,
  run: async (client, interaction) => {
    const userId = interaction.user.id;
    const userProducts = await getUserProducts(userId);
    

    if (userProducts.length === 0) {
      await interaction.reply("No has comprado ningún producto aún.");
    } else {
      const embed = new EmbedBuilder()
        .setTitle("Tus Productos Comprados")


      userProducts.forEach(product => {
        embed.addFields(
          { name: `Producto: ${product.name}`, value: `Descarga: ${product.url})` }
      )
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};
