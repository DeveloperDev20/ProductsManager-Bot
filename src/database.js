const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.connect(config.mongourl, {
});

const ProductSchema = new mongoose.Schema({
  name: String,
  url: String,
  users: [{
    type: String,
  }],
});

const ProductModel = mongoose.model("Product", ProductSchema);

async function getProductList(userId) {
  if (userId) {
    return await ProductModel.find({ users: userId });
  } else {
    return await ProductModel.find();
  }
}

async function addProductToUser(userId, productId) {
  const product = await ProductModel.findById(productId);
  if (product) {
    if (!product.users.includes(userId)) {
      product.users.push(userId);
      await product.save();
      return true;
    }
  }
  return false;
}






async function addUserToProduct(userId, productName) {
  const product = await ProductModel.findOne({ name: productName });

  if (product && !product.users.includes(userId)) {
    product.users.push(userId);
    await product.save();
    return true;
  }

  return false;
}

async function getUserProducts(userId) {
  try {
    return await ProductModel.find({ users: userId }).select('name url');
  } catch (error) {
    console.error('Error querying user products:', error.message);
    return [];
  }
}

async function createProduct(name, url) {
  const newProduct = new ProductModel({
    name,
    url,
  });
  await newProduct.save();
}

async function editProduct(oldName, newName, newUrl) {
  const product = await ProductModel.findOne({ name: oldName });
  if (product) {
    product.name = newName || product.name;
    product.url = newUrl || product.url;
    await product.save();
  }
}

async function deleteProduct(name) {
  await ProductModel.deleteOne({ name: name });
}

async function removeUserFromProduct(userId, productName) {
  try {
    const product = await ProductModel.findOne({ name: productName });

    if (!product) {
      return false;
    }

    const index = product.users.indexOf(userId);

    if (index === -1) {
      return false; 
    }

    product.users.splice(index, 1);

    await product.save();

    return true; 
  } catch (error) {
    console.error('Error al remover usuario del producto:', error.message);
    return false; 
  }
}



module.exports = {
  getProductList,
  addProductToUser,
  addUserToProduct,
  getUserProducts,
  createProduct,
  editProduct,
  deleteProduct,
  removeUserFromProduct,
};
