const productModel = require('../model/product');

const getAllProducts = async () => {
  return productModel.find({});
};

const createProduct = async (body) => {
  const newProduct = new productModel(body);
  await newProduct.save();
  return newProduct;
};

const updateProducto = async (_id, updateObject) => {
  return productModel.findOneAndUpdate({ _id }, updateObject, {
    upsert: false,
    new: true,
  });
};

const deleteProducto = async (_id) => {
  return productModel.findOneAndDelete({ _id });
};

const obtenerProductoNombre = async (nombreProducto) => {
  return productModel.findOne({ nombreProducto });
};

const obtenerCantidadProducto = async (nombreProducto) => {
  const producto = await productModel.findOne({ nombreProducto });
  return producto ? producto.cantidadProducto : 0;
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProducto,
  deleteProducto,
  obtenerProductoNombre,
  obtenerCantidadProducto,
};
