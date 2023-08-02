import productModel from "../model/product.model.js";

export default class ProductServiceDao {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = async () => {
    try {
      const products = await productModel.find({});
      console.log(
        "🚀 ~ file: product.repository.js:12 ~ ProductServiceDao ~ getAllProducts= ~ products:",
        products
      );
      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.repository.js:17 ~ ProductServiceDao ~ getAllProducts= ~ error:",
        error
      );
    }
  };

  createProduct = async (productData) => {
    try {
      // const product = await productTable.queryBuilder(`insert into Producuts from {$1,$2}`)
      const product = await productModel.create(productData); //USAR MONGO
      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.repository.js:25 ~ ProductServiceDao ~ createProduct= ~ error:",
        error
      );
    }
  };

  getProductById = async (pId) => {
    try {
      const product = await productModel.findById({ _id: pId });
      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.repository.js:41 ~ ProductServiceDao ~ getProductById= ~ error:",
        error
      );
    }
  };

  // TODO ACTUALIZAR EL METODO DELETE EN CONTROLAR Y REPOSITORIO(SERVICIO)
  deleteProductById = async (req, res) => {
    try {
      const delProd = await productModel.deleteOne({ _id: req.params.pId });
      return delProd;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.repository.js:54 ~ ProductServiceDao ~ deleteProductById ~ error:",
        error
      );
    }
  };
}
