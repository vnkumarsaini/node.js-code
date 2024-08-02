import ProductModel from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    let productData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      images: images,
      department: req.body.departmentId,
    });
    if (productData) res.status(201).send({ message: "Product Created" });
    else res.status(404).send({ message: "Unable to create product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    let productData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
        qty: req.body.qty,
        price: req.body.price,
        images: images,
        department: req.body.departmentId,
      }
    );
    if (productData) res.status(200).send({ message: "Product Updated",productData });
    else res.status(404).send({ message: "Unable to update product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let productData = await ProductModel.deleteOne({
      _id: req.body.id,
    });
    if (productData.deletedCount == 1)
      res.status(200).send({ message: "Product Deleted" });
    else res.status(404).send({ message: "Unable to delete product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getAllProductsByDepartmentId = async (req, res) => {
  try {
    let productData = await ProductModel.find({
      department: req.query.departmentId,
    }).populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ productData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const productDetails = async (req, res) => {
  try {
    let productData = await ProductModel.findOne({
      _id: req.query.id,
    }).populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ productData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const updateProductQty = async (req, res) => {
  try {
    let product = await ProductModel.findOne({ _id: req.body.id });
    let active = true;
    if (product.qty - req?.body?.qty <= 0) {
      active = false;
    }
    let productData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        qty: product?.qty - req.body.qty,
        active: active,
      }
    );
    if (productData) res.status(200).send({ message: "product qty updated" });
    else res.status(400).send({ message: "unable to update product qty" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
