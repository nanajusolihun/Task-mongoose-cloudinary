import Products from "../models/products.js";
import messages from "../utils/messages.js";
import Cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res) => {
  const file = req.file;
  const body = req.body;

  if (file) {
    try {
      const result = await Cloudinary.uploader.upload(file.path);

      const profile_img = result.secure_url;
      const cloudinary_id = result.public_id;

      let product = await new Products({
        ...body,
        image: profile_img,
        cloudinary_id: cloudinary_id,
      }).save();

      messages(res, 200, "Create data Product Success", product);
    } catch (error) {
      messages(res, 500, error?.message || "Internal Server Error");
    }
  } else {
    messages(res, 423, "Image is Required");
  }
};

const allProducts = async (req, res) => {
  try {
    const result = await Products.find();

    messages(res, 200, "Show all data Products", result);
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const detailProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.findById(id);

    messages(res, 200, "Detail data Product", detail);
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.findById(id);

    if (!detail) return messages(res, 404, "Product Not Found");

    // Delete image from cloudinary
    await Cloudinary.uploader.destroy(detail.cloudinary_id);

    // Delete Product from DB
    await Products.deleteOne(detail._id);

    messages(res, 200, "Delete Product Success");
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const file = req.file;
  const body = req.body;

  try {
    let detail = await Products.findById(id);
    const data = {...body};

    if (!detail) return messages(res, 404, "Product Not Found")
    if (file) {
      // Delete image from cloudinary
      await Cloudinary.uploader.destroy(detail.cloudinary_id);

      // Upload new image from cloudinary
      const result = await Cloudinary.uploader.upload(file.path);

      data.image = result.secure_url;
      data.cloudinary_id = result.public_id;
    }
    const newData = await Products.findByIdAndUpdate(id, data, {
      new: true,
    });

    messages(res, 200, "Update Product Success", newData)
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
}

export { createProduct, allProducts, detailProduct, deleteProduct, updateProduct };
