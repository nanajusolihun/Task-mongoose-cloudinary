import mongoose from "../config/mongoose.js";

const productShcema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  image: String,
  cloudinary_id: String,
});

// Collections
export default mongoose.model("Products", productShcema);
