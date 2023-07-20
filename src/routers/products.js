import express from "express";
import { createProduct, allProducts, detailProduct, deleteProduct, updateProduct } from "../controllers/products.js";
import uploadImage from "../middleware/products.js";

const Router = express.Router();

Router.post("/products", uploadImage, createProduct);
Router.get("/products", allProducts);
Router.get("/products/:id", detailProduct);
Router.delete("/products/:id", deleteProduct);
Router.put("/products/:id", uploadImage, updateProduct);

export default Router;
